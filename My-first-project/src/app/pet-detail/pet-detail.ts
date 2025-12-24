import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Beast} from '../shared/models/beasts.model';
import {NgIf, NgStyle} from '@angular/common';
import { PetService } from '../services/pet'; // Імпорт сервісу
import { ActivatedRoute, Router } from '@angular/router'; // Імпорт роутингу
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-detail',
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.css',
})
export class PetDetail implements OnInit {
  public pet: Beast | undefined;

  private routeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString && idString.trim().length > 0) {
        const petStringId = idString;
        this.petService.getPetById(petStringId as any).subscribe(data => {
          this.pet = data;
          if (!this.pet) {
            console.warn(`[PetDetail] Вихованця з ID: ${petStringId} не знайдено.`);
          }
        });
      } else {
        console.error('[PetDetail] Некоректний ID в маршруті (ID відсутній або порожній).');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
