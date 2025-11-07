export enum DietType {
  Carnivore = 'хижак',
  Herbivore = 'травоїдний',
  Omnivore = 'всеїдний'
}

export interface Beast {
  id: number; //id
  name?: string; //ім'я тварини
  age: number; //вік
  type: string; //тип кіт собака і тд
  breed?: string; // Порода (якщо є)
  imageUrl?: string; //зображення
  lifespan?: number; // середня тривалість життя (необов'язково)
  diet: DietType; // "хижак", "травоїдний", "всеїдний"
  sound: string; //звучання тварини
}
