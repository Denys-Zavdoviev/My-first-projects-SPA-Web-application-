import { Directive, ElementRef, HostListener, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHoverCard]',
  standalone: true
})
export class HoverCard implements OnInit{
  @Input('HoverCard') hoverShadowColor: string = 'rgba(99, 61, 1, 0.6)';
  @Input() defaultShadow: string = '0 2px 5px rgba(99, 61, 1, 0.1)';
  @Input() hoverShadow: string = `0 10px 20px ${this.hoverShadowColor}`;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', this.defaultShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out');
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', this.hoverShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-5px) scale(1.02)'); // Невелике підняття
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', this.defaultShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0) scale(1)'); // Повернення на місце
  }
}
