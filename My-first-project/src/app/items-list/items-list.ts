import { Component, Input } from '@angular/core';
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
      // lifespan: 18, // середня тривалість життя (необов'язково)
      // diet:  DietType.Omnivore, // "хижак", "травоїдний", "всеїдний"
      sound: 'Мяф' //коментар від кота
    },
    {  id: 1,
      name: 'Вольт',
      ageNum: 3,
      ageYMD: ageType.Years,
      type: beastType.Dog,
      breed: 'Бернський зенненхунд',
      imageUrl: '/img/Card-Pet/Вольт.jpg',
      // lifespan: 10,
      // diet:  DietType.Omnivore,
      sound: 'Гаф'
    },
    {  id: 2,
      name: 'Арон',
      ageNum: 5,
      ageYMD: ageType.Months,
      type: beastType.Raven,
      breed: '',
      imageUrl: '',
      // lifespan: 10,
      // diet:  DietType.Omnivore,
      sound: 'Каар'
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

  getAllPets(){
    return this.Pet_Card.length;
  }
  selectedFilter: string = 'Всі';

  getselectedFilter(value: string) {
    console.log('Вибраний тип у ItemsList:', value);
    this.selectedFilter = value;
  }
  get filteredPets(){
    return this.selectedFilter === 'Всі'
      ? this.Pet_Card
      : this.Pet_Card.filter(beast => beast.type === this.selectedFilter);
  }
}
