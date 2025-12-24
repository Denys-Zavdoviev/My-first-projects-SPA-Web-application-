export enum DietType {
  Carnivore = 'мʼясоїдство',
  Herbivore = 'травоїдство',
  Omnivore = 'всеїдність'
}

export enum ageType {
  Years = 'р.',
  Months = 'міс.',
  Days = 'д.'
}

export enum beastType {
  Cat = 'Кіт',
  Dog = 'Собака',
  Fish = 'Риба',
  Raven = 'Ворон',
  Lizard = 'Ящірка',
  Snail = 'Слимак',
  Crab = 'Краб',
  Snake = 'Змія',
  Spider = 'Павук'
}

export interface Beast {
  id?: string; //id
  name?: string; //ім'я тварини
  ageNum: number; //вік число
  ageYMD: ageType; // рік, місяць, день
  type: beastType; //тип кіт собака і тд
  breed?: string; // Порода (якщо є)
  imageUrl?: string; //зображення
  sound?: string; //звучання тварини
  liketoy?: string; // улюбоена іграшка
  diet?: DietType; // хижак, травоїдний, всеїдний
  imgback?: string; // фонове зображення
  comment?: string;
}
