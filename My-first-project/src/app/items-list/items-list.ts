import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ItemCard} from '../item-card/item-card';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';
import {NgFor, NgIf} from '@angular/common';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';

@Component({
  selector: 'app-items-list',
  imports: [ItemCard, NgFor, NgIf, Search, Filter],
  templateUrl: './items-list.html',
  styleUrl: './items-list.css',
})
export class ItemsList {
  public Pet_Card: Beast[] = [
    {  id: 0, //id
      name: 'Боря', //ім'я тварини
      ageNum: 9, //вік
      ageYMD: ageType.Years,
      type: beastType.Cat, //тип кіт собака і тд
      breed: 'Раґамаффін', // Порода (якщо є)
      imageUrl: '/img/Card-Pet/Боря.jpg', //зображення
      liketoy: 'Нерви хозяїна', // середня тривалість життя (необов'язково)
      diet:  DietType.Carnivore, // "хижак", "травоїдний", "всеїдний"
      sound: 'Мяф', //коментар від кота
      imgback: '/img/Card-Pet/лапки65.png'
    },
    {  id: 1,
      name: 'Вольт',
      ageNum: 3,
      ageYMD: ageType.Years,
      type: beastType.Dog,
      breed: 'Бернський зенненхунд',
      imageUrl: '/img/Card-Pet/Вольт.jpg',
      liketoy: "М'ячик",
      diet:  DietType.Omnivore,
      sound: 'Гаф',
      imgback: '/img/Card-Pet/Кістки65.png'
    },
    {  id: 2,
      name: 'Арон',
      ageNum: 5,
      ageYMD: ageType.Months,
      type: beastType.Raven,
      breed: '',
      imageUrl: '',
      liketoy: '',
      diet:  DietType.Omnivore,
      sound: 'Каар',
      imgback: ''
    }
  ];
  public Pet_Comm: string[] = [
    `${this.Pet_Card[0].sound}!
    Як ви вже зрозуміли, я ${this.Pet_Card[0].name}.
    В себе вдома я голова всього. А ще, це сторінка про моїх сусідів. Тому знайте. Я за вами стежу!)`,

    `${this.Pet_Card[1].sound}!
    Мене звати ${this.Pet_Card[1].name}.
    Я люблю гуляти зі своїми господарями. А ще люблю коли мене годують.
    В мене є друг ${this.Pet_Card[0].name}, ${this.Pet_Card[1].sound}`,

    `${this.Pet_Card[2].sound}! Я надто швидкий для камери.`
  ];

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
