import { AdminResponse } from "./AdminResponse";

export interface Message {
  id?: string; // Identifiant du message
  userId: string;
  content: string;
  timestamp?: string;
  adminResponses?: AdminResponse[]; // Ajoutez ce champ pour stocker les réponses de l'administrateur
  user: {
    firstName: string;
    lastName:string;
}
}
