import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  lastSubpage: string;

  constructor() { }

  public getSubpage(): string {
    return this.lastSubpage;
  }

  public setSubpage(subpage: string): void {
    this.lastSubpage = subpage;
  }
}
