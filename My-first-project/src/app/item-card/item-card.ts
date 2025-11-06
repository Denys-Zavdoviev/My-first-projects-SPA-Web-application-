import {Component, Input} from '@angular/core';
import {Beast, DietType} from '../shared/models/beasts.model';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() pet!: Beast;
  @Input() comment!: string;
}
