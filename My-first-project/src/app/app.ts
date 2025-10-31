import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Layout} from './layout/layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Layout,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My-first-project');
}

