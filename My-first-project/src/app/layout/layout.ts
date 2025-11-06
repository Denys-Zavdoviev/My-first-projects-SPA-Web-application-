import { Component } from '@angular/core';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {ItemsList} from '../items-list/items-list';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, ItemsList],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  public list_nav: string[] = ["Розділ 1", "Розділ 2", "Розділ 3"];
}
