import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Beast} from '../shared/models/beasts.model';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-pet-detail',
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.css',
})
export class PetDetail {
  @Input() pet!: Beast;
  @Input() comment!: string;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
