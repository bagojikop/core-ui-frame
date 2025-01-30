import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./add-grid-data.component').then(m => m.AddGridDataComponent),
    data: {
      title: 'add'
    }
  }
];
