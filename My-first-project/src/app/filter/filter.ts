import {Component, Output, Input, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
    @Input() all: number = 0;
    @Input() types: string[] = [];
    @Input() typeCounts: { [key: string]: number } = {};
    @Output() selectedFilterChanged: EventEmitter<string> = new EventEmitter<string>();
    selectedFilter: string = 'all';
    onSelectedFilterChanged(){
      this.selectedFilterChanged.emit(this.selectedFilter);
    }
}
