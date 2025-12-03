import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {ItemCard} from '../item-card/item-card';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';
import {PetService} from '../services/pet';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-items-list',
  imports: [ItemCard,
    NgFor,
    NgIf,
    Search,
    Filter,
    AsyncPipe],
  templateUrl: './items-list.html',
  styleUrl: './items-list.css',
})
export class ItemsList implements OnInit, OnDestroy{

  public Pet_Card: Beast[] = [];
  public Pet_Comm: string[] = [];

  public filteredPets$: Observable<Beast[]>;

  private getItemsSubscription!: Subscription;
  // private filteredPetsSubscription!: Subscription;

  constructor(private petService: PetService) {
    this.filteredPets$ = this.petService.filteredPets$;
  }

  // Виклик методу getItems() у ngOnInit()
  ngOnInit(): void {
    console.log('[ItemsList] ngOnInit: Підписка на сервіс даних.');
    this.getItemsSubscription = this.petService.getItems().subscribe(data => {
      this.Pet_Card = data.pets;
      this.Pet_Comm = data.comments;
      this.petService.filterPets(this.searchText, this.selectedFilter);
    });
  }

  ngOnDestroy(): void {
    if (this.getItemsSubscription) {
      this.getItemsSubscription.unsubscribe(); // Відписка від getItems()
      console.log('[ItemsList] ngOnDestroy: Відписка від getItemsSubscription.');
    }
    console.log('[ItemsList] ngOnDestroy: Компонент знищено.');
  }

  searchText: string = '';
  selectedFilter: string = 'Всі'; // Зберігаємо стан фільтра

  // 5. Поле пошуку має відправляти запит у сервіс
  getSearchText(value: string) {
    this.searchText = value;
    console.log(`[ItemsList] getSearchText: Оновлення тексту пошуку: "${value}".`);
    // Оновлюємо фільтрацію, використовуючи обидва параметри
    this.petService.filterPets(this.searchText, this.selectedFilter);
  }

  getAllPets(){
    return this.Pet_Card.length;
  }

  getselectedFilter(value: string) {
    console.log('[ItemsList] Вибраний тип у ItemsList:', value);
    this.selectedFilter = value;
    // Оновлюємо фільтрацію, використовуючи обидва параметри
    this.petService.filterPets(this.searchText, this.selectedFilter);
  }
}
