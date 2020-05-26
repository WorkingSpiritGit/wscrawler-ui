import { GebruikersRol } from './gebruikers-rol.enum';

export class Gebruiker {
    id: number;
    voornaam: string;
    tussenvoegsel: string;
    achternaam: string;
    gebruikersnaam: string;
    emailadres: string;
    rol: GebruikersRol;
}
