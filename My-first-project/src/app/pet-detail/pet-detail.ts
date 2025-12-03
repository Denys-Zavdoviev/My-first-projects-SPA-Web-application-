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
  // @Input() pet!: Beast;
  // @Input() comment!: string;
  // @Output() close = new EventEmitter<void>();

  // closeModal() {
  //   this.close.emit();
  // }

  public pet: Beast | undefined;
  public comment: string | undefined;

  private routeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute, // Для доступу до параметрів маршруту
    private petService: PetService, // Для отримання даних
    private router: Router // Для можливої навігації назад (опціонально)
  ) {}

  ngOnInit(): void {
    // Підписуємося на параметри маршруту (id)
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      const petId = idString ? +idString : NaN; // Перетворюємо рядок на число

      if (!isNaN(petId)) {
        this.petService.getPetById(petId).subscribe(data => {
          this.pet = data.pet;
          this.comment = data.comment;
          if (!this.pet) {
            console.warn(`[PetDetail] Вихованця з ID: ${petId} не знайдено.`);
            // Опціонально: перенаправити на список, якщо вихованця не знайдено
            // this.router.navigate(['/items']);
          }
        });
      } else {
        console.error('[PetDetail] Некоректний ID в маршруті.');
        // Опціонально: перенаправити на список, якщо ID некоректний
        // this.router.navigate(['/items']);
      }
    });
  }

  // Необов'язкова реалізація ngOnDestroy для очищення підписки
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
