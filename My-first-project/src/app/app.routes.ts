import {RouterModule, Routes} from '@angular/router';
import {ItemsList} from './items-list/items-list';
import {NgModule} from '@angular/core';
import {PetDetail} from './pet-detail/pet-detail';
import {ItemForm} from './item-form/item-form';
import { Login } from './login/login';
import { Register } from './register/register';
import {authGuard} from './auth-guard'

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemsList },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'add-item', component: ItemForm, canActivate: [authGuard]},
  { path: 'items/:id', component: PetDetail },
  { path: '**', redirectTo: 'items' }
];
