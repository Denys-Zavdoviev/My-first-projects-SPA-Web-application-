import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsList } from './items-list';
import { PetService } from '../services/pet';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ItemCard } from '../item-card/item-card';
import { beastType, ageType } from '../shared/models/beasts.model';
import { provideRouter } from '@angular/router';
import { AuthService } from '../services/auth';

fdescribe('ItemsList Integration Test', () => {
  let component: ItemsList;
  let fixture: ComponentFixture<ItemsList>;
  let petServiceMock: any;
  let authServiceMock: any;

  const mockPets = [
    { id: '1', name: 'Боря', ageNum: 9, ageYMD: ageType.Years, type: beastType.Cat },
    { id: '2', name: 'Вольт', ageNum: 3, ageYMD: ageType.Years, type: beastType.Dog }
  ];

  beforeEach(async () => {
    petServiceMock = {
      getItems: jasmine.createSpy('getItems').and.returnValue(of(mockPets)),
      filteredPets$: of(mockPets),
      filterPets: jasmine.createSpy('filterPets')
    };

    authServiceMock = {
      isAdmin: jasmine.createSpy('isAdmin').and.returnValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [ItemsList, ItemCard],
      providers: [
        { provide: PetService, useValue: petServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render correct number of pet cards', () => {
    const cardElements = fixture.debugElement.queryAll(By.directive(ItemCard));
    expect(cardElements.length).toBe(2);
  });

  it('should pass correct pet data to child components', () => {
    const firstCardDebug = fixture.debugElement.query(By.directive(ItemCard));
    const firstCardComponent = firstCardDebug.componentInstance as ItemCard;
    expect(firstCardComponent.pet.name).toBe('Боря');
  });

  it('should call handleDeletePet when child emits delete event', () => {
    spyOn(component, 'handleDeletePet');

    const firstCardDebug = fixture.debugElement.query(By.directive(ItemCard));
    const firstCardComponent = firstCardDebug.componentInstance as ItemCard;
    firstCardComponent.deletePet.emit('1');
    expect(component.handleDeletePet).toHaveBeenCalledWith('1');
  });
});
