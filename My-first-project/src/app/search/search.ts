import { Component, Input } from '@angular/core';
import {NgClass, NgFor, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, NgStyle,NgClass],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

}
