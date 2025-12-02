import {Component, Input} from '@angular/core';
import {Beast, DietType} from '../shared/models/beasts.model';
import {NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [NgFor, NgIf, NgStyle,NgClass, RouterLink],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() pet!: Beast;
  // @Input() comment!: string;
}
