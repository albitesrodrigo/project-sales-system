import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrl: './no-page-found.component.scss',
  standalone: false,
})
export class NoPageFoundComponent {
  constructor(private router: Router, private location: Location) {}

  goBack() {
    this.location.back();
  }
  goHome() {
    this.router.navigate(['/inicio/home']);
  }
}
