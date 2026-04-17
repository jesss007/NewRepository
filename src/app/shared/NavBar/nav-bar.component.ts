import { Component, OnInit } from '@angular/core';
import { sharedImports } from '../Imports/shared-imports';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  navItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.navItems = [
      {
        label: 'Products',
        icon: 'pi pi-box',
        command: () => this.router.navigate(['/product']),
      },
      {
        label: 'Opening Balance',
        icon: 'pi pi-wallet',
        command: () => this.router.navigate(['/opening-balance']),
      },
      {
        label: 'Stock Summary',
        icon: 'pi pi-chart-bar',
        command: () => this.router.navigate(['/stock-summary']),
      },
    ];
  }
}
