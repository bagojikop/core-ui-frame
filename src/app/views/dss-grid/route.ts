import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dss-grid.component').then(m => m.DssGridComponent),
    data: {
      title: 'Grid'
    }
  }
];
