import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Offre } from '../listeoffreencadrant/offremodel';
import { CommentServiceService } from 'src/app/comment-service.service';
import { ToastrService } from 'ngx-toastr';
import {  CommentOffre} from './CommentOffre';

@Component({
  selector: 'app-listeoffreetudiant',
  templateUrl: './listeoffreetudiant.component.html',
  styleUrls: ['./listeoffreetudiant.component.scss']
})
export class ListeoffreetudiantComponent implements OnInit {
  offresByEntreprise: Offre[] = [];
  filteredOffresByEntreprise: Offre[] = [];
  filteredValue: string = '';
  showAssistant: boolean = false;
  userInput: string = '';
  assistantResponse: any;
  showQuestions: boolean = true;
  offresRecommandees: Offre[] = [];
  reponses: any = {};
  userId: string = '65c3d6f5e969ef6cc82524c0';
  reaction: string = '';
  nouveauCommentaireTexte: string = '';
  newComment: string = '';
  selectedOffer: Offre | null = null; // Déclarer selectedOffer et initialiser à null
  newCommentText: string;
  commentaires: CommentOffre[];
  showComments: boolean = false;
  likes:number|null;
  dislikes:number|null;
  userReactions: { [offreId: string]: 'like' | 'dislike' } = {};
  trouverOffreParId: any;


  constructor(private http: HttpClient, private commentaireService: CommentServiceService,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getOffresByEntreprise();
    this.loadComments();
    this.newCommentText = ''; // Réinitialiser le champ de saisie après l'ajout d'un commentaire


    // Abonnement à l'événement pour recharger les commentaires
    this.commentaireService.getNouveauCommentaireAjouteObservable().subscribe(() => {
      this.loadComments();
    });
  }

  getOffresByEntreprise(): void {
    this.http.get<Offre[]>('http://localhost:8081/api/offres/byEntreprise').subscribe(
      (data: Offre[]) => {
        console.log(data); // Inspecter les données reçues
        this.offresByEntreprise = data;
        this.filteredOffresByEntreprise = this.offresByEntreprise;
        this.loadComments();
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des offres :', error);
      }
    );
  }
  

  reactToOffer(offreId: string, reactionType: string): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const requestBody = { reactionType: reactionType };

    this.http.post<any>(`http://localhost:8081/api/offres/${offreId}/reactions`, requestBody, httpOptions)
      .subscribe(
        (response: any) => {
          console.log('Réaction ajoutée avec succès :', response);
          // Ajoutez ici la logique pour mettre à jour l'interface utilisateur si nécessaire
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de la réaction :', error);
          // Ajoutez ici la logique pour gérer les erreurs
        }
      );
  }

  showFullDescription: { [key: string]: boolean } = {};

  toggleDescription(offreId: string) {
    this.showFullDescription[offreId] = !this.showFullDescription[offreId];
  }
  // Méthode pour sélectionner une offre
  selectOffer(offer: Offre): void {
    this.selectedOffer = offer;
    // Charger les commentaires pour l'offre sélectionnée
    this.loadComments();
  }
  submitComment(): void {
    if (!this.newCommentText || !this.selectedOffer || !this.selectedOffer.id) {
      return;
    }
  
    const nouveauCommentaire: CommentOffre = {
      texte: this.newCommentText,
      userId: this.userId,
      offreId: this.selectedOffer.id,
      user: {
        id: this.userId,
        firstName: '',
        lastName: ''
      }
    };
  
    if (!this.selectedOffer.commentaires) {
      this.selectedOffer.commentaires = [];
    }
  
    this.selectedOffer.commentaires.push(nouveauCommentaire);
  
    const commentsInCache = JSON.parse(localStorage.getItem('comments')) || [];
    commentsInCache.push(nouveauCommentaire);
    localStorage.setItem('comments', JSON.stringify(commentsInCache));
  
    this.commentaireService.ajouterCommentaire(this.userId, this.selectedOffer.id, nouveauCommentaire).subscribe(
      (response: any) => {
        console.log('Le commentaire a été ajouté avec succès :', response);
        this.newCommentText = ''; // Réinitialiser le champ de saisie après avoir ajouté le commentaire avec succès
        this.toastr.success('Le commentaire a été ajouté avec succès !');
      },
      (error) => {
        this.toastr.success('Le commentaire a été ajouté avec succès !');
      }
    );
  }
  selectedComment: any; // Déclarer la propriété selectedComment

  
  toggleReplyForm(comment: any) {
    // Inversez l'état de la propriété "selectedComment" pour afficher ou masquer le formulaire de réponse
    this.selectedComment = this.selectedComment === comment ? null : comment;
  }
  toggleCommentsVisibility(): void {
    this.showComments = !this.showComments; // Inverser l'état actuel
  }
  


  // Fonction pour soumettre une réponse à un commentaire
  submitReply(comment: any): void {
    // Envoyer la réponse à votre service ou effectuer d'autres traitements nécessaires
    console.log('Réponse soumise:', comment.replyText);
    comment.replying = false; // Désactiver le champ de réponse après l'envoi
  }

  loadComments(): void {
    // Vérifier si une offre est sélectionnée
    if (this.selectedOffer) {
      // Appeler le service pour charger les commentaires de l'offre sélectionnée
      this.commentaireService.getCommentsByOffre(this.selectedOffer.id)
        .subscribe(comments => {
          // Mettre à jour la liste des commentaires de l'offre sélectionnée
          this.selectedOffer.commentaires = comments;
        });
    }
  }

  addReply(comment: CommentOffre, replyText: string, user: any) {
    const newReply: CommentOffre = {
      userId: user.id,
      offreId: comment.offreId,
      texte: replyText,
      user: user,
      replies: [] // Initialisez la propriété replies pour stocker les réponses aux réponses
    };
    if (!comment.replies) {
      comment.replies = [];
    }
    comment.replies.push(newReply);
  }
  
  toggleRepliesVisibility(comment: CommentOffre) {
    comment.showReplies = !comment.showReplies; // Toggle visibility for replies
  }

 

  
  likeOffre(offreId: string): void {
    // Vérifier si l'utilisateur a déjà réagi à cette offre
    if (this.userReactions[offreId]) {
      this.toastr.warning('Vous avez déjà réagi à cette offre.');
      return;
    }
  
    Object.entries(this.offresByEntreprise).forEach(([entreprise, offres]) => {
      const offre = offres.find(o => o.id === offreId);
      if (offre) {
        this.http.post(`http://localhost:8081/api/offres/${offreId}/like?userId=${this.userId}`, {}).subscribe(
          () => {
            this.toastr.success('Offre aimée avec succès', 'Succès');
            offre.likes = (offre.likes || 0) + 1; // Incrémenter les likes
            this.userReactions[offreId] = 'like'; // Marquer que l'utilisateur a aimé cette offre
          },
          (error) => {
            console.error('Erreur lors de l\'aimée de l\'offre :', error);
            this.toastr.error('Une erreur s\'est produite lors de l\'aimée de l\'offre', 'Erreur');
          }
        );
        return;
      }
    });
  }
  
  
  dislikeOffre(offreId: string): void {
    // Vérifier si l'utilisateur a déjà "liké" cette offre
    if (this.userReactions[offreId] === 'like') {
      this.toastr.warning('Vous ne pouvez pas disliker une offre que vous avez déjà aimée.');
      return;
    }
  
    // Vérifier si l'utilisateur a déjà "disliké" cette offre
    if (this.userReactions[offreId] === 'dislike') {
      this.toastr.warning('Vous avez déjà réagi à cette offre.');
      return;
    }
  
    Object.entries(this.offresByEntreprise).forEach(([entreprise, offres]) => {
      const offre = offres.find(o => o.id === offreId);
      if (offre) {
        this.http.post(`http://localhost:8081/api/offres/${offreId}/dislike?userId=${this.userId}`, {}).subscribe(
          () => {
            this.toastr.success('Offre désaimée avec succès', 'Succès');
            offre.dislikes = (offre.dislikes || 0) + 1; // Incrémenter les dislikes
            this.userReactions[offreId] = 'dislike'; // Marquer que l'utilisateur a "disliké" cette offre
          },
          (error) => {
            console.error('Erreur lors de la désaimée de l\'offre :', error);
            this.toastr.error('Une erreur s\'est produite lors de la désaimée de l\'offre', 'Erreur');
          }
        );
        return;
      }
    });
  }
}  