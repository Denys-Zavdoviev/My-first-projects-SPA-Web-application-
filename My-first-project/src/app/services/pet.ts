import {EventEmitter, Injectable, Output} from '@angular/core';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
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

  public getItems() {
    return {
      pets: this.Pet_Card,
      comments: this.Pet_Comm
    };
  }
}
