// messagemodel.ts
export interface Message {
id?: string;
  userId?: string;
  content: string;
  timestamp?: string;
  adminResponses?: AdminResponse[]; // Réponses de l'administrateur associées à ce message
  lastName:string;
  firstName:string;
}

export interface AdminResponse {
  adminResponseId?: string;
  content: string;
}