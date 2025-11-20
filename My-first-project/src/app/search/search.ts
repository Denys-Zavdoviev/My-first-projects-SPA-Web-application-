import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, NgStyle,NgClass, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchText: string = '';
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.searchText);
  }

}
