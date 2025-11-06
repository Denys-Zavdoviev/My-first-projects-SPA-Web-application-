import { Component, Input  } from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() navItems: string[] = [];

  text_header:string = 'Домашні тварини';
}
