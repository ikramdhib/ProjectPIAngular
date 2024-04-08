import { Stage } from "./Stage";

export interface User {
    id: string;
    lastName: string;
    firstName: string;
    login: string;
    password: string;
    resume: string;
    pic: string;
    unvId: number;
   // Assurez-vous d'importer le type Level si nécessaire
    phoneNumber: string;
    emailPro: string;
    company: string;
    stage: Stage[]; // Assurez-vous d'importer le modèle Stage si nécessaire
  }