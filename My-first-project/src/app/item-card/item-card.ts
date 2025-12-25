import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Beast, DietType} from '../shared/models/beasts.model';
import {NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AgeUnitFullPipe} from '../pipes/age-unit-full-pipe';
import {HoverCard} from '../directives/hover-card';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-item-card',
  imports: [NgFor, NgIf, NgStyle,NgClass, RouterLink, AgeUnitFullPipe, HoverCard],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() pet!: Beast;
  @Output() deletePet = new EventEmitter<string>();
  constructor(private authService: AuthService) {}
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  onDelete() {
    this.deletePet.emit(this.pet.id);
  }
}
