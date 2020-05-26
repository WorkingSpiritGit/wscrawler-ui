import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: "Beheer gebruikers",
        link: "./gebruikers",
        index: 0
      },
      {
        label: "Beheer websites",
        link: "./websites",
        index: 1
      },
      {
        label: "Beheer zoektermen",
        link: "./zoekterm",
        index: 2
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.toonGebruikers();
  }

  toonGebruikers(): void {
    this.router.navigateByUrl('admin/gebruikers');
  }
}
