import { Binary } from "@angular/compiler";

export interface Offre {
    id?: string; // Utilisez une chaîne de caractères pour l'ID si vous utilisez ObjectId dans votre backend
    nomEntreprise: string;
    logoentreprise?: string; // Champ pour stocker le fichier du logo de l'entreprise
    nomEncadrant: string;
    prenomEncadrant: string;
    email: string;
    description: string;
    datedebut_stage: Date;
    datefin_stage: Date;
  }

