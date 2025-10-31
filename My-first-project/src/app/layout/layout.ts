import { Component } from '@angular/core';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
