import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = [];

  constructor(private location: Location) { }

  back(): void {
      this.location.back();
  }
}
