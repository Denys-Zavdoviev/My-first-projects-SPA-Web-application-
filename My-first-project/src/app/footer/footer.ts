import { Component, Input } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [NgForOf],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  @Input() footerItems: string[] = [];

  text_footer = '© 2025. Виконано в начальних цілях';
  title_link =  "Зворотний зв'язок з нами =)";
  // list_feedback: string[] = ["Розділ 1", "Розділ 2", "Розділ 3"];
}
