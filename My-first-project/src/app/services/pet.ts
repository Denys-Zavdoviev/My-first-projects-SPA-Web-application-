import {EventEmitter, Injectable, Output} from '@angular/core';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface Item extends Beast {}

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

  // 1. BehaviorSubject для поточного стану списку тварин
  private _filteredPetsSubject: BehaviorSubject<Beast[]> = new BehaviorSubject<Beast[]>(this.Pet_Card);
  // Observable для підписки компонентів
  public filteredPets$: Observable<Beast[]> = this._filteredPetsSubject.asObservable();

  // 2. Метод getItems() повертає Observable<Item[]>
  public getItems(): Observable<{ pets: Item[], comments: string[] }> {
    return of({ // Використовуємо оператор of()
      pets: this.Pet_Card,
      comments: this.Pet_Comm
    });
  }

  // 3. Метод для фільтрації та оновлення BehaviorSubject
  public filterPets(searchText: string, filterType: string): void {
    let petsToFilter = this.Pet_Card;

    // Фільтрація за типом (якщо не 'Всі')
    if (filterType !== 'Всі') {
      petsToFilter = petsToFilter.filter(beast => beast.type === filterType);
    }

    // Фільтрація за текстом пошуку
    if (searchText && searchText.trim() !== '') {
      const lowerCaseSearchText = searchText.toLowerCase().trim();
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

    // Оновлення BehaviorSubject
    this._filteredPetsSubject.next(petsToFilter);
  }

  // Метод для отримання коментарів (залишаємо як є)
  public getComments(): string[] {
    return this.Pet_Comm;
  }
}
