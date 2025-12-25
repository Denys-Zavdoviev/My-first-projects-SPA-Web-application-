import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  // styleUrl: './register.css',
  styleUrl: '../item-form/item-form.css',
})
export class Register {
  userData = { name: '', email: '', password: '' };
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        switch (err.message) {
          case 'NameAlreadyExists':
            this.errorMessage = 'Це ім’я вже зайняте. Оберіть інше.';
            break;
          case 'EmailAlreadyExists':
            this.errorMessage = 'Користувач із такою поштою вже зареєстрований.';
            break;
          default:
            this.errorMessage = 'Помилка реєстрації. Спробуйте пізніше.';
            break;
        }
      }
    });
  }
}
