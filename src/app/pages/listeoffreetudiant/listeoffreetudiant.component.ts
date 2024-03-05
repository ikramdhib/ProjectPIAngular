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
  userId: string = '65cbd3246188fc097c303ae0';
  reaction: string = '';
  nouveauCommentaireTexte: string = '';
  newComment: string = '';
  selectedOffer: Offre | null = null; // Déclarer selectedOffer et initialiser à null
  newCommentText: string;
  commentaires: CommentOffre[];
  showComments: boolean = false;
  likes:number|null;
  dislikes:number|null;


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
    this.http.get<Offre[]>('http://localhost:8081/api/offres/byEntreprise')
      .subscribe(
        (data: Offre[]) => {
          this.offresByEntreprise = data;
          this.filteredOffresByEntreprise = this.offresByEntreprise;
  
          // Charger les commentaires pour l'offre sélectionnée
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
  this.http.post('http://localhost:8081/api/offres/' + offreId + '/like', {}).subscribe(
    () => {
      this.toastr.success('Offre aimée avec succès', 'Succès');
      this.getOffresByEntreprise();

      // Mettre à jour les offres après avoir aimé
     
    },
    (error) => {
      console.error('Erreur lors de l\'aimée de l\'offre :', error);
      this.toastr.error('Une erreur s\'est produite lors de l\'aimée de l\'offre', 'Erreur');
    }
  );
}

dislikeOffre(offreId: string): void {
  this.http.post('http://localhost:8081/api/offres/' + offreId + '/dislike', {}).subscribe(
    () => {
      this.toastr.success('Offre désaimée avec succès', 'Succès');
      this.getOffresByEntreprise();
      // Mettre à jour les offres après avoir désaimé
    
    },
    (error) => {
      console.error('Erreur lors de la désaimée de l\'offre :', error);
      this.toastr.error('Une erreur s\'est produite lors de la désaimée de l\'offre', 'Erreur');
    }
  );
}







}