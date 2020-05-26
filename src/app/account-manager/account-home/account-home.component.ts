import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = 0;

  constructor(private router: Router, private dataService: DataService) {
    this.navLinks = [
      {
        label: "Nieuwe vacatures",
        link: "./nieuw",
        index: 0
      },
      {
        label: "Bekijk vacatures",
        link: "./vacatures",
        index: 1
      },
      {
        label: "In behandeling",
        link: "./actief",
        index: 2
      },
      {
        label: "Archief",
        link: "./archief",
        index: 3
      },
      {
        label: "Zoekopdracht",
        link: "./zoeken",
        index: 4
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.linkDoor();
  }

  linkDoor(): void {
    if (isNullOrUndefined(this.dataService.getSubpage())) {
      this.router.navigateByUrl("accountmanager/nieuw");
    } else {
      this.router.navigateByUrl("accountmanager/" + this.dataService.getSubpage());
    }
  }
}