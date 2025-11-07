import {Component, Input} from '@angular/core';
import {Beast, DietType} from '../shared/models/beasts.model';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-item-card',
  imports: [NgFor, NgIf],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() pet!: Beast;
  @Input() comment!: string;
  // isValidImage(url: string): boolean {
  //   return /\.(jpg|jpeg|png|webp)$/i.test(url);
  // }
}
