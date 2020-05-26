import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZoekopdrachtService } from '../services/zoekopdracht.service';
import { Zoekopdracht } from '../model/zoekopdracht';
import { Website } from '../model/website';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-zoekscherm',
  templateUrl: './zoekscherm.component.html',
  styleUrls: ['./zoekscherm.component.scss']
})
export class ZoekschermComponent implements OnInit {
  zoekform: FormGroup;
  status: boolean[] = [true, false, false];
  zoekopdracht: Zoekopdracht = new Zoekopdracht;
  websites: Website[] = new Array;
  website: Website = new Website();

  constructor(private fb: FormBuilder, private zoekopdrachtService: ZoekopdrachtService, private websiteService:WebsiteService) {
    this.zoekform = fb.group({
      website:  ['', Validators.required]
    });
  }

  ngOnInit() {
    this.websitesOphalen();
  }

  zoeken(): void {
    const val = this.zoekform.value;

    if (val.website) {
      this.status[0] = false;
      this.status[1] = true;

      this.website = val.website;

      this.zoekopdrachtService.crawlWebsite(this.website).subscribe(response => {
        this.status[1] = false;
        this.status[2] = true;
      },
      (error) => {
        this.zoekform.reset();
        this.status[1] = false;
        this.status[0] = true;
      });
    }
  }

  zieResultaten(): void {
    alert("Werkt niet ;)");
  }

  websitesOphalen(){
    this.websiteService.geefAlleWebsites().subscribe(websiteLijst => {
      this.websites = websiteLijst;
    });
  }
}
