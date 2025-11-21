import { Component } from '@angular/core';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {ItemsList} from '../items-list/items-list';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';
import {PetDetail} from '../pet-detail/pet-detail';
import {Beast} from '../shared/models/beasts.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, ItemsList, PetDetail, NgIf],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  public list_nav: string[] = ["Розділ 1", "Розділ 2", "Розділ 3"];

  selectedPet!: Beast;
  selectedComment!: string;
  showAlert: boolean = false;


  setSelectedPet(event: { pet: Beast, comment: string }) {
    this.selectedPet = event.pet;
    this.selectedComment = event.comment;
    this.showAlert = true;
    console.log('Інфо відкрито!');
  }

  onAlertClose(): void {
    this.showAlert = false;
    console.log('Інфо закрито!');
  }
}
