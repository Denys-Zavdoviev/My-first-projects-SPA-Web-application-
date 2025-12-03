import { Pipe, PipeTransform } from '@angular/core';
import { ageType } from '../shared/models/beasts.model';

@Pipe({
  name: 'ageUnitFull',
  standalone: true
})
export class AgeUnitFullPipe implements PipeTransform {
  /**
   * Допоміжна функція для вибору коректної української форми слова.
   * @param num Число (вік).
   * @param forms Масив трьох форм: [1: однина, 2-4: середня множина, 5+: множина].
   * @returns Коректна форма слова.
   */
  private static pluralize(num: number, forms: [string, string, string]): string {
    // Беремо останню цифру числа
    const n = Math.abs(num);
    // Беремо останні дві цифри для виключення чисел 11-14
    const n10 = n % 10;
    const n100 = n % 100;

    // Спеціальне правило для 11-14 (завжди використовуємо загальну множину)
    if (n100 >= 11 && n100 <= 14) {
      return forms[2];
    }
    // Правило для 1 (використовуємо однину)
    if (n10 === 1) {
      return forms[0];
    }
    // Правило для 2, 3, 4 (використовуємо середню множину)
    if (n10 >= 2 && n10 <= 4) {
      return forms[1];
    }
    // Правило для 0 та 5-9 (використовуємо загальну множину)
    return forms[2];
  }
  transform(value: ageType, ageNum: number): string {
    switch (value) {
      case ageType.Years:
        // [рік, роки, років]
        return AgeUnitFullPipe.pluralize(ageNum, ['рік', 'роки', 'років']);
      case ageType.Months:
        // [місяць, місяці, місяців]
        return AgeUnitFullPipe.pluralize(ageNum, ['місяць', 'місяці', 'місяців']);
      case ageType.Days:
        // [день, дні, днів]
        return AgeUnitFullPipe.pluralize(ageNum, ['день', 'дні', 'днів']);
      default:
        return '';
    }
  }
}
