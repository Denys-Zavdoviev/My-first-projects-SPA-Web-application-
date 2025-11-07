import { Component } from '@angular/core';
import {ItemCard} from '../item-card/item-card';
import {Beast, DietType} from '../shared/models/beasts.model';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-items-list',
  imports: [ItemCard, NgFor],
  templateUrl: './items-list.html',
  styleUrl: './items-list.css',
})
export class ItemsList {
  public Pet_Card: Beast[] = [
    {  id: 0, //id
      name: 'Боря', //ім'я тварини
      age: 9, //вік
      type: 'Кіт', //тип кіт собака і тд
      breed: 'Раґамаффін', // Порода (якщо є)
      imageUrl: '/img/Card-Pet/Боря.jpg', //зображення
      lifespan: 18, // середня тривалість життя (необов'язково)
      diet:  DietType.Omnivore, // "хижак", "травоїдний", "всеїдний"
      sound: 'Мяф' //коментар від кота
    },
    {  id: 1,
      name: 'Вольт',
      age: 3,
      type: 'Собака',
      breed: 'Бернський зенненхунд',
      imageUrl: '/img/Card-Pet/Вольт.jpg',
      lifespan: 10,
      diet:  DietType.Omnivore,
      sound: 'Гаф'
    }
  ];
  public Pet_Comm: string[] = [
    `${this.Pet_Card[0].sound}!
    Як ви вже зрозуміли, я ${this.Pet_Card[0].name}.
    В себе вдома я голова всього. А ще, це сторінка про моїх сусідів. Тому знайте. Я за вами стежу!)`,

    `${this.Pet_Card[1].sound}!
    Мене звати ${this.Pet_Card[1].name}.
    Я люблю гуляти зі своїми господарями. А ще люблю коли мене годують.
    В мене є друг ${this.Pet_Card[0].name}, ${this.Pet_Card[1].sound}`
  ];

}
