export interface CommentOffre {
    id?: string; // Identifiant du commentaire (optionnel si vous générez les identifiants côté serveur)
    userId: string; // Identifiant de l'utilisateur qui a posté le commentaire
    offreId: string; // Identifiant de l'offre à laquelle le commentaire est associé
    texte: string; // Contenu du commentaire
    user?: {
      id: string; // Identifiant de l'utilisateur
      firstName: string; // Prénom de l'utilisateur
      lastName: string; // Nom de l'utilisateur
    };
    isReply?: boolean; // Indique si le commentaire est une réponse à un autre commentaire
    replies?: CommentOffre[]; // Liste des réponses à ce commentaire (commentaires enfants)
    showReplies?: boolean; // Pour gérer la visibilité des réponses
  
  }