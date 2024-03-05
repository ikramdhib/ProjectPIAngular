export interface AdminResponse {
    adminResponseId: string;
    id?: string; // ID du message de l'étudiant auquel cette réponse est associée
    content: string;
    timestamp: Date;
    user: {
        userId: string;
    }
  }
  