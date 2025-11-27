import {Component, Output, Input, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})

export class Filter {
    @Input() all: number = 0;
    @Input() typePets: Beast[] = [];
    @Output() selectedFilterChanged: EventEmitter<string> = new EventEmitter<string>();

  getTypeCount(type: string): number {
    return this.typePets.filter(p => p.type === type).length;
  }
  get uniqueTypes(): string[] {
    return Object.values(beastType);
  }

  selectedFilter: string= 'Всі';

  onSelectedFilterChanged(){
      console.log('Вибраний тип:', this.selectedFilter);
    // При зміні вибраного значення, емітуємо його до батьківського компонента (ItemsList)
      this.selectedFilterChanged.emit(this.selectedFilter);
  }
}

