import { Component, OnInit } from '@angular/core';
import { PageEvent, MatPaginator, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { VacatureService } from 'src/app/services/vacature.service';
import { VacatureDTO } from 'src/app/model/vacature-dto';
import { SorteerDTO } from 'src/app/model/sorteer-dto';
import { VacatureDeleteDialogComponent } from 'src/app/dialog/vacature-delete-dialog/vacature-delete-dialog.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vacature-tabel',
  templateUrl: './vacature-tabel.component.html',
  styleUrls: ['./vacature-tabel.component.scss']
})
export class VacatureTabelComponent implements OnInit {
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

  constructor(private vacatureService: VacatureService, private dialog: MatDialog, private snackbar: MatSnackBar,
              private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.haalEersteVacaturesOp();
  }

  sorteer(kolomnaam: string): void {
    this.descending = !this.descending;
    this.sorteerOp = kolomnaam;
    if (this.descending) {
      this.direction = "DESC";
    } else {
      this.direction = "ASC";
    }
    this.haalEersteVacaturesOp();
  }

  haalEersteVacaturesOp(): void {
    this.sorteerDTO.page = 0;
    this.sorteerDTO.size = 25;
    this.sorteerDTO.sort = this.sorteerOp;
    this.sorteerDTO.sortDir = this.direction;
    this.sorteerDTO.zoekopdrachten = this.filters;
    this.haalAantalVacaturesOp(this.sorteerDTO);
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalAantalVacaturesOp(sorteerDTO: SorteerDTO): void {
    this.vacatureService.geefAantalVacatures(sorteerDTO).subscribe(aantal => {
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
    this.vacatureService.geefAlleVacatures(sorteerDTO).subscribe(vacatureLijst => {
      this.vacatureLijst = vacatureLijst;
    });
  }

  filterVacatures(): void {
    this.haalEersteVacaturesOp();
  }

  resetFilter(): void {
    this.filters = new Array;
    this.haalEersteVacaturesOp();
  }

  openLink(url: string): void {
    window.open(url, "_blank");
  }

  naarVacature(id: number): void {
    this.dataService.setSubpage("vacatures");
    this.router.navigateByUrl("accountmanager/vacature/" + id);
  }

  openDialog(vacature: VacatureDTO): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = vacature;

    const dialogRef = this.dialog.open(VacatureDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(teVerwijderenVacature => {
      this.vacatureService.verwijderVacature(teVerwijderenVacature.id, teVerwijderenVacature).subscribe(response => {
        this.openSnackbar("De vacature is verwijderd.", "Sluit", "correctmelding");
        this.haalEersteVacaturesOp();
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
