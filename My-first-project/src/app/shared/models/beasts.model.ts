export enum DietType {
  Carnivore = 'хижак',
  Herbivore = 'травоїдний',
  Omnivore = 'всеїдний'
}
export enum ageType {
  Years = 'р.',
  Months = 'міс.',
  Days = 'д.'
}

export interface Beast {
  id: number; //id
  name?: string; //ім'я тварини
  ageNum: number; //вік число
  ageYMD: ageType; // рік, місяць, день
  type: string; //тип кіт собака і тд
  breed?: string; // Порода (якщо є)
  imageUrl?: string; //зображення
  lifespan?: number; // середня тривалість життя (необов'язково)
  diet: DietType; // хижак, травоїдний, всеїдний
  sound?: string; //звучання тварини
}
