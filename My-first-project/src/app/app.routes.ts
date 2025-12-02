import {RouterModule, Routes} from '@angular/router';
import {ItemsList} from './items-list/items-list';
import {NgModule} from '@angular/core';
import {PetDetail} from './pet-detail/pet-detail';

export const routes: Routes = [
// Маршрут для головної сторінки, перенаправляє на /items
  { path: '', redirectTo: 'items', pathMatch: 'full' },

  // Маршрут для списку елементів
  { path: 'items', component: ItemsList },

  // Динамічний маршрут для детального перегляду
  { path: 'items/:id', component: PetDetail },

  // Маршрут 404 (опціонально)
  { path: '**', redirectTo: 'items' }
];
