import { Component } from '@angular/core';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {ItemsList} from '../items-list/items-list';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';
import {PetDetail} from '../pet-detail/pet-detail';
import {Beast} from '../shared/models/beasts.model';
import {NgIf} from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}
@Component({
  selector: 'app-layout',
  imports: [Header, Footer, ItemsList, PetDetail, NgIf, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  public list_nav: NavItem[] = [
    { label: "Головна", route: "/items" },
    // { label: "Новий Друг", route: "/add-item" }
  ];
}
