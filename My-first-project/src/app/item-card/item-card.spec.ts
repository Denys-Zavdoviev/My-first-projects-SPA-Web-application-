import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCard } from './item-card';
import { AuthService } from '../services/auth';
import { beastType, ageType } from '../shared/models/beasts.model';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

fdescribe('ItemCardComponent', () => {
  let component: ItemCard;
  let fixture: ComponentFixture<ItemCard>;
  let authServiceMock: any;

  const mockPet = {
    id: '123',
    name: 'Боря',
    ageNum: 9,
    ageYMD: ageType.Years,
    type: beastType.Cat,
    breed: 'Раґамаффін',
    imageUrl: '/img/Card-Pet/Боря.jpg'
  };

  beforeEach(async () => {
    authServiceMock = {
      isAdmin: jasmine.createSpy('isAdmin').and.returnValue(false)
    };

    await TestBed.configureTestingModule({
      imports: [ItemCard],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideRouter([])
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ItemCard);
    component = fixture.componentInstance;
    component.pet = mockPet;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct pet name in H2', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Боря');
  });

  it('should display the correct breed', () => {
    const breedElement = fixture.debugElement.query(By.css('.pet_breed')).nativeElement;
    expect(breedElement.textContent).toContain('Раґамаффін');
  });

  it('should display correct pet type', () => {
    const typeElement = fixture.debugElement.query(By.css('.pet_type')).nativeElement;
    expect(typeElement.textContent).toContain('Кіт');
  });

  it('should NOT show delete button if user is not admin', () => {
    const deleteBtn = fixture.debugElement.query(By.css('.delete-btn'));
    expect(deleteBtn).toBeNull()
  });

  it('should show delete button if user IS admin', () => {
    authServiceMock.isAdmin.and.returnValue(true);
    fixture.detectChanges();

    const deleteBtn = fixture.debugElement.query(By.css('.delete-btn'));
    expect(deleteBtn).not.toBeNull();
  });
});
