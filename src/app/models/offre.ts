export enum Type {
    FORMATION_HUMAINE_SOCIALE = 'FORMATION_HUMAINE_SOCIALE',
    IMMERSION_ENTREPRISE = 'IMMERSION_ENTREPRISE',
    INGENIEUR = 'INGENIEUR',
    NON_OBLIGATOIRE = 'NON_OBLIGATOIRE',
  }
  
  export class Offre {
    idOffre: string;
    titre: string;
    description: string;
    localisation: string;
    dateDebut: Date;
    dateFin: Date;
    competencesRequises: string[];
    entreprise: string;
    hashtags: string[];
    type: Type; // Ajout de la propriété Type
  
    constructor() {
      this.competencesRequises = [];
      this.hashtags = [];
    }
  }