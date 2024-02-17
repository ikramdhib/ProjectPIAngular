export interface Offre {
    id?: string; // Utilisez une chaîne de caractères pour l'ID si vous utilisez ObjectId dans votre backend
    nomEntreprise: string;
    logoentreprise?: string;
    logoentrepriseUrl:string;
    nomEncadrant: string;
    prenomEncadrant: string;
    email: string;
    description: string;
    datedebut_stage: Date;
    datefin_stage: Date;
  }

