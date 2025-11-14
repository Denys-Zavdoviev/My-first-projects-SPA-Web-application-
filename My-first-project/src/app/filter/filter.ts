import {Component, Output, Input, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
    @Input() all: number = 0;
    @Input() typePets: Beast[] = [];
    @Output() selectedFilterChanged: EventEmitter<string> = new EventEmitter<string>();

    selectedFilter: string | beastType = 'all';

    onSelectedFilterChanged(){
      this.selectedFilterChanged.emit(this.selectedFilter);
    }

    get uniqueTypes(): string[] {
      return Object.values(beastType);
    }

    getTypeCount(type: beastType): number {
      return this.typePets.filter(p => p.type === type).length;
    }
}
