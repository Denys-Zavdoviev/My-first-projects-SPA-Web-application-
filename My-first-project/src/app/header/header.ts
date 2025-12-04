import { Component, Input  } from '@angular/core';
import {NgFor} from '@angular/common';
import {RouterLink} from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header {
  @Input() navItems: NavItem[] = [];

  text_header:string = 'Домашні тварини';
}
