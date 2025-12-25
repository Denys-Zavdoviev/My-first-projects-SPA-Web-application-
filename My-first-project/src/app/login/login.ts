import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  // styleUrl: './login.css',
  styleUrl: '../item-form/item-form.css',
})
export class Login {
  loginData = { email: '', password: '' };
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.message === 'UserNotFound') {
          this.errorMessage = 'Користувача з таким e-mail або паролем не знайдено';
        } else {
          this.errorMessage = 'Сталася помилка при вході. Спробуйте пізніше.';
        }
        console.error(err);
      }
    });
  }
}
