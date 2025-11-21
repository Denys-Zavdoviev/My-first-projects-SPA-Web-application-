import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ItemCard} from '../item-card/item-card';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';
import {NgFor, NgIf} from '@angular/common';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';
import {PetService} from '../services/pet';

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
export class ItemsList implements OnInit{
  // Зміна локальних даних на властивості, які будемо заповнювати з сервісу
  public Pet_Card: Beast[] = [];
  public Pet_Comm: string[] = [];

  // Впровадження сервісу через конструктор
  constructor(private petService: PetService) {}

  //Виклик методу getItems() у ngOnInit()
  ngOnInit(): void {
    const data = this.petService.getItems();
    this.Pet_Card = data.pets;
    this.Pet_Comm = data.comments;
  }

  @Output()
  selectedPetEvent = new EventEmitter<{ pet: Beast, comment: string }>();

  onSelectedPet(pet: Beast) {
    this.selectedPetEvent.emit({
      pet: pet,
      comment: this.Pet_Comm[pet.id]
    });
  }

  searchText: string = '';

  getSearchText(value: string) {
    this.searchText = value;
  }

  getAllPets(){
    return this.Pet_Card.length;
  }
  selectedFilter: string = 'Всі';

  getselectedFilter(value: string) {
    console.log('Вибраний тип у ItemsList:', value);
    this.selectedFilter = value;
  }
  get filteredPets(){
    let petsToFilter = this.Pet_Card;
    if (this.selectedFilter !== 'Всі') {
      petsToFilter = petsToFilter.filter(beast => beast.type === this.selectedFilter);
    }
    if (this.searchText && this.searchText.trim() !== '') {
      const lowerCaseSearchText = this.searchText.toLowerCase().trim();
      petsToFilter = petsToFilter.filter(beast => {
        const comment = this.Pet_Comm[beast.id] ?? '';
        return (
          (beast.name ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.breed ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.type ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.liketoy ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.diet ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.sound ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          comment.toLowerCase().includes(lowerCaseSearchText)
        );
      });
    }
    return petsToFilter;
  }
}
