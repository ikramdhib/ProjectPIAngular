import { User } from "./User";

export interface Stage {
    id: string;
    journal: string;
    certificate: string;
    report: string;
    startAt: Date;
    endAt: Date;
    // Assurez-vous d'importer le type Type si nécessaire
    encadrant: User; // Assurez-vous d'importer le modèle User si nécessaire
    etudiant: User; // Assurez-vous d'importer le modèle User si nécessaire
  }