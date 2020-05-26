import { Vacaturestatus } from './vacaturestatus.enum';

export class VacatureDTO {

    id: number;
    titel: string;
    tekst: string;
    url: string;
    aantalVacatures: number;
    gezien: boolean;
    datum: Date;
    status: Vacaturestatus;
    manager: string;
    notities: string;
    gearchiveerd: boolean;
}
