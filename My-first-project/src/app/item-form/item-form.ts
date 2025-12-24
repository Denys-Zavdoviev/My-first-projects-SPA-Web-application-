import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import { Router } from '@angular/router';
import { PetService } from '../services/pet';
import { ageType, beastType, DietType, Beast } from '../shared/models/beasts.model';
import {AgeUnitFullPipe} from '../pipes/age-unit-full-pipe';

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule, NgFor, NgIf, CommonModule, AgeUnitFullPipe],
  standalone: true,
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm implements OnInit{
  petForm!: FormGroup;
  // Дані для селектів (засновані на beasts.model.ts)
  ageTypes = Object.values(ageType); // 'р.', 'міс.', 'д.'
  beastTypes = Object.values(beastType); // 'Кіт', 'Собака' і т.д.
  dietTypes = Object.values(DietType); // 'мʼясоїдство' і т.д.

  previewUrl: string | ArrayBuffer | null = null;
  imageUploadData: string | null = null;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.petForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      ageNum: [1, [Validators.required, Validators.min(1)]],
      ageYMD: [this.ageTypes[0], [Validators.required]],
      type: [this.beastTypes[0], [Validators.required]],
      imageFileName: [''],
      imgback: [''],
      breed: [''],
      liketoy: [''],
      diet: [this.dietTypes[0], [Validators.required]],
      sound: [''],
      comment: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.imageUploadData = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.f['imageFileName'].setValue('');

    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.petForm.controls;
  }

  onSubmit() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }
    const formValue = this.petForm.value;
    let finalImageUrl: string;
    if (this.imageUploadData) {
      finalImageUrl = this.imageUploadData;
    }
    else if (formValue.imageFileName) {
      finalImageUrl = `/img/Card-Pet/${formValue.imageFileName}`;
    }
    else {
      finalImageUrl = '';
    }

    const newPet: Beast = {
      id: undefined as any,
      imageUrl: finalImageUrl,
      name: formValue.name,
      ageNum: formValue.ageNum,
      ageYMD: formValue.ageYMD,
      type: formValue.type,
      breed: formValue.breed,
      liketoy: formValue.liketoy,
      diet: formValue.diet,
      sound: formValue.sound,
      imgback: formValue.imgback,
      comment: formValue.comment || ''
    };

    this.petService.addPet(newPet)
      .subscribe({
        next: (addedPet) => {
          console.log('Успішно додано вихованця з ID:', addedPet.id);
          this.petService.getItems().subscribe({
            next: () => {
              this.router.navigate(['/items']);
            },
            error: (err) => console.error('Помилка оновлення списку після POST:', err)
          });
        },
        error: (err) => {
          console.error('Помилка при додаванні вихованця:', err);
          alert('Помилка при додаванні даних. Перевірте роботу json-server.');
        }
      });
  }

}
