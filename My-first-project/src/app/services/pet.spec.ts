import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PetService } from './pet';
import { beastType, ageType } from '../shared/models/beasts.model';

describe('PetService', () => {
  let service: PetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PetService]
    });
    service = TestBed.inject(PetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pets from API via getItems()', () => {
    const mockPets = [
      { id: '0', name: 'Боря', ageNum: 9, ageYMD: ageType.Years, type: beastType.Cat }
    ];
    service.getItems().subscribe(pets => {
      expect(pets.length).toBe(1);
      expect(pets[0].name).toBe('Боря');
    });
    const req = httpMock.expectOne('http://localhost:3000/pets');
    expect(req.request.method).toBe('GET');

    req.flush(mockPets);
  });
});
