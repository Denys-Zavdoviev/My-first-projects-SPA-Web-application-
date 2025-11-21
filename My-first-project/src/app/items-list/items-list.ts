import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {ItemCard} from '../item-card/item-card';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';
import {NgFor, NgIf} from '@angular/common';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';
import {PetService} from '../services/pet';
import { Subscription } from 'rxjs'; // 👈 Імпорт Subscription

@Component({
  selector: 'app-items-list',
  imports: [ItemCard,
    NgFor,
    NgIf,
    Search,
    Filter],
  templateUrl: './items-list.html',
  styleUrl: './items-list.css',
})
export class ItemsList implements OnInit, OnDestroy{ // Реалізація OnDestroy
  // Зміна локальних даних на властивості, які будемо заповнювати з сервісу
  public Pet_Card: Beast[] = [];
  public Pet_Comm: string[] = [];

  public filteredPets: Beast[] = []; // Список тварин для відображення (з BehaviorSubject)

  private getItemsSubscription!: Subscription; // Змінна для підписки на getItems()
  private filteredPetsSubscription!: Subscription; // Змінна для підписки на BehaviorSubject

  //Впровадження сервісу через конструктор
  constructor(private petService: PetService) { }

  // Виклик методу getItems() у ngOnInit()
  ngOnInit(): void {
    console.log('[ItemsList] ngOnInit: Підписка на сервіс даних.');
    // Підписка на Observable від getItems()
    this.getItemsSubscription = this.petService.getItems().subscribe(data => {
      this.Pet_Card = data.pets;
      this.Pet_Comm = data.comments;
      // Ініціалізуємо BehaviorSubject в сервісі з повним списком
      this.petService.filterPets(this.searchText, this.selectedFilter);
    });

    // Підписка на BehaviorSubject для оновлення відображуваного списку
    this.filteredPetsSubscription = this.petService.filteredPets$.subscribe(pets => {
      this.filteredPets = pets;
      console.log(`[ItemsList] BehaviorSubject оновлено: Показано ${this.filteredPets.length} елементів.`);
    });
  }

  // Реалізація механізму відписки
  ngOnDestroy(): void {
    if (this.getItemsSubscription) {
      this.getItemsSubscription.unsubscribe(); // Відписка від getItems()
      console.log('[ItemsList] ngOnDestroy: Відписка від getItemsSubscription.');
    }
    if (this.filteredPetsSubscription) {
      this.filteredPetsSubscription.unsubscribe(); // Відписка від BehaviorSubject
      console.log('[ItemsList] ngOnDestroy: Відписка від filteredPetsSubscription.');
    }
    console.log('[ItemsList] ngOnDestroy: Компонент знищено.');
  }

  @Output()
  selectedPetEvent = new EventEmitter<{ pet: Beast, comment: string }>();

  onSelectedPet(pet: Beast) {
    console.log(`[ItemsList] onSelectedPet: Вибрано вихованця ID: ${pet.id}, Ім'я: ${pet.name}.`);
    this.selectedPetEvent.emit({
      pet: pet,
      comment: this.Pet_Comm[pet.id]
    });
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
  // get filteredPets(){
  //   let petsToFilter = this.Pet_Card;
  //   if (this.selectedFilter !== 'Всі') {
  //     petsToFilter = petsToFilter.filter(beast => beast.type === this.selectedFilter);
  //   }
  //   if (this.searchText && this.searchText.trim() !== '') {
  //     const lowerCaseSearchText = this.searchText.toLowerCase().trim();
  //     petsToFilter = petsToFilter.filter(beast => {
  //       const comment = this.Pet_Comm[beast.id] ?? '';
  //       return (
  //         (beast.name ?? '').toLowerCase().includes(lowerCaseSearchText) ||
  //         (beast.breed ?? '').toLowerCase().includes(lowerCaseSearchText) ||
  //         (beast.type ?? '').toLowerCase().includes(lowerCaseSearchText) ||
  //         (beast.liketoy ?? '').toLowerCase().includes(lowerCaseSearchText) ||
  //         (beast.diet ?? '').toLowerCase().includes(lowerCaseSearchText) ||
  //         (beast.sound ?? '').toLowerCase().includes(lowerCaseSearchText) ||
  //         comment.toLowerCase().includes(lowerCaseSearchText)
  //       );
  //     });
  //   }
  //   return petsToFilter;
  // }
}
