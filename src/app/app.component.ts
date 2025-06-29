import { Component, inject, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { PRIMENG_ES } from '../assets/i18n/primeng-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'project-sales-system';
  private primengConfig = inject(PrimeNG);

  ngOnInit(): void {
    this.primengConfig.setTranslation(PRIMENG_ES);
  }
}
