import { HoverCard } from './hover-card';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HoverCard', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    const mockRenderer = {} as Renderer2;
    // const directive = new HoverCard();
    const directive = new HoverCard(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
