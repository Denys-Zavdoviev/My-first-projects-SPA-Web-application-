import { Component, Input  } from '@angular/core';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {RouterLink, Router} from '@angular/router';
import { AuthService } from '../services/auth';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header {
  @Input() navItems: NavItem[] = [];
  text_header:string = 'Домашні тварини';
  constructor(public authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/items']);
  }
}
