import {Component, Input} from '@angular/core';
import {Beast} from '../shared/models/beasts.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-pet-detail',
  imports: [
    NgIf
  ],
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.css',
})
export class PetDetail {
  @Input() pet!: Beast;
  @Input() comment!: string;
}
