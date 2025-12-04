import { Component, Input } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  imports: [NgForOf, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  @Input() navItems: NavItem[] = [];

  text_footer = '© 2025. Виконано в навчальних цілях';
  title_link =  "Зворотний зв'язок з нами =)";
  // list_feedback: string[] = ["Розділ 1", "Розділ 2", "Розділ 3"];
}
