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
    type:Type;
    duree: 0,
    linkedinProfileUrl: '',
    likes?:number,
    dislikes?:number // Ajoutez cette propriété pour stocker l'URL LinkedIn
    hashtags?: string[]; // Ajoutez cette propriété pour stocker les hashtags

  };
    
  
  export enum Type {
    FORMATION_HUMAINE_SOCIALE = 'Formation Humaine Sociale',
    IMMERSION_ENTREPRISE = 'Immersion Entreprise',
    INGENIEUR = 'Ingénieur',
  }
  

