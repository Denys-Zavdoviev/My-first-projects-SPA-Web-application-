import { Component } from '@angular/core';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {ItemsList} from '../items-list/items-list';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';
import {PetDetail} from '../pet-detail/pet-detail';
import {Beast} from '../shared/models/beasts.model';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, ItemsList, PetDetail],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  selectedPet!: Beast;
  public list_nav: string[] = ["Розділ 1", "Розділ 2", "Розділ 3"];

  setSelectedPet(value: Beast) {
    this.selectedPet = value;
  }
}
