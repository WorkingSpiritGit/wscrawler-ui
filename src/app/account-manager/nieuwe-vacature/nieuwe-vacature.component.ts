import { Component, OnInit } from '@angular/core';
import { VacatureDTO } from 'src/app/model/vacature-dto';
import { PageEvent, MatPaginator, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { SorteerDTO } from 'src/app/model/sorteer-dto';
import { VacatureService } from 'src/app/services/vacature.service';
import { VacatureDeleteDialogComponent } from 'src/app/dialog/vacature-delete-dialog/vacature-delete-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nieuwe-vacature',
  templateUrl: './nieuwe-vacature.component.html',
  styleUrls: ['./nieuwe-vacature.component.scss']
})
export class NieuweVacatureComponent implements OnInit {
  vacatureLijst: VacatureDTO[] = new Array;
  vacature: VacatureDTO = new VacatureDTO;
  columnsToDisplay = ['status', 'titel', 'manager', 'datum', 'link', 'delete'];
  event: PageEvent;
  sorteerDTO: SorteerDTO = new SorteerDTO;
  filterOpties: string[] = ['Infra', 'Developer', 'Java', '.NET', 'DevOps', 'Engineer'];
  filters: string[] = new Array;
  paginator: MatPaginator;
  length: number;
  descending: boolean = false;
  direction: string = "ASC";
  sorteerOp: string = "datum";
  datum = new Date;

  constructor(private vacatureService: VacatureService, private dialog: MatDialog, private snackbar: MatSnackBar,
              private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.haalNieuwsteVacaturesOp();
  }

  sorteer(kolomnaam: string): void {
    this.descending = !this.descending;
    this.sorteerOp = kolomnaam;
    if (this.descending) {
      this.direction = "DESC";
    } else {
      this.direction = "ASC";
    }
    this.haalNieuwsteVacaturesOp();
  }

  haalNieuwsteVacaturesOp(): void {
    this.sorteerDTO.page = 0;
    this.sorteerDTO.size = 25;
    this.sorteerDTO.sort = this.sorteerOp;
    this.sorteerDTO.sortDir = this.direction;
    this.sorteerDTO.zoekopdrachten = this.filters;
    this.haalAantalVacaturesOp(this.sorteerDTO);
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalAantalVacaturesOp(sorteerDTO: SorteerDTO): void {
    this.vacatureService.geefAantalNieuweVacatures(sorteerDTO).subscribe(aantal => {
      this.length = aantal;
    });
  }

  haalVacaturesOpPagina(event: PageEvent): void {
    this.sorteerDTO.page = event.pageIndex;
    this.sorteerDTO.size = event.pageSize;
    this.sorteerDTO.sortDir = this.direction;
    this.sorteerDTO.sort = this.sorteerOp;
    this.sorteerDTO.zoekopdrachten = this.filters;
    this.haalAantalVacaturesOp(this.sorteerDTO);
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalVacaturesOp(sorteerDTO: SorteerDTO): void {
    this.vacatureService.geefAlleNieuweVacatures(sorteerDTO).subscribe(vacatureLijst => {
      this.vacatureLijst = vacatureLijst;
    });
  }

  filterVacatures(): void {
    this.haalNieuwsteVacaturesOp();
  }

  resetFilter(): void {
    this.filters = new Array;
    this.haalNieuwsteVacaturesOp();
  }

  openLink(url: string): void {
    window.open(url, "_blank");
  }

  naarVacature(id: number): void {
    this.dataService.setSubpage("nieuw");
    this.router.navigateByUrl("accountmanager/vacature/" + id);
  }

  openDialog(vacature: VacatureDTO): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = vacature;

    const dialogRef = this.dialog.open(VacatureDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(teVerwijderenVacature => {
      this.vacatureService.verwijderVacature(teVerwijderenVacature.id, teVerwijderenVacature).subscribe(response => {
        this.openSnackbar("De vacature is verwijderd.", "Sluit", "correctmelding");
        this.haalNieuwsteVacaturesOp();
      },
      (error) => {
        this.openSnackbar("Het verwijderen van de vacature is mislukt.", "Sluit", "foutmelding");
      });
    });
  }

  openSnackbar(melding: string, actie: string, cssOpmaak: string) {
    this.snackbar.open(melding, actie, {
      duration: 5000,
      panelClass: [cssOpmaak]
    });
  }
}
