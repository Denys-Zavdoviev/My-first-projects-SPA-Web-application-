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

  public filteredPets$: Observable<Beast[]>;
  private getItemsSubscription!: Subscription;

  constructor(private petService: PetService) {
    this.filteredPets$ = this.petService.filteredPets$;
  }

  // Виклик методу getItems() у ngOnInit()
  ngOnInit(): void {
    console.log('[ItemsList] ngOnInit: Підписка на сервіс даних.');
    this.getItemsSubscription = this.petService.getItems().subscribe( pets=> {
      this.Pet_Card = pets;
      // this.petService.filterPets(this.searchText, this.selectedFilter);
    });
  }

  ngOnDestroy(): void {
    if (this.getItemsSubscription) {
      this.getItemsSubscription.unsubscribe();
      console.log('[ItemsList] ngOnDestroy: Відписка від getItemsSubscription.');
    }
    console.log('[ItemsList] ngOnDestroy: Компонент знищено.');
  }

  searchText: string = '';
  selectedFilter: string = 'Всі';

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
    this.petService.filterPets(this.searchText, this.selectedFilter);
  }

  handleDeletePet(petId: string) {
    this.petService.deletePet(petId).subscribe({
      next: () => {
        console.log(`Вихованець з ID ${petId} успішно видалений.`);
        this.petService.getItems().subscribe();
      },
      error: (err) => {
        console.error('Помилка при видаленні:', err);
      }
    });
  }
}
