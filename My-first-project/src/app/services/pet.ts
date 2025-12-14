import {EventEmitter, Injectable, Output} from '@angular/core';
import {ageType, Beast, beastType, DietType} from '../shared/models/beasts.model';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

export interface Item extends Beast {}

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) { }
  private readonly apiUrl = 'http://localhost:3000/pets';
  private allPets: Beast[] = [];

  private _filteredPetsSubject: BehaviorSubject<Beast[]> = new BehaviorSubject<Beast[]>([]);
  public filteredPets$: Observable<Beast[]> = this._filteredPetsSubject.asObservable();

  // Метод getItems() Новий
  public getItems(): Observable<Beast[]> {
    return this.http.get<Beast[]>(this.apiUrl)
      .pipe(
        tap(pets => {
          this.allPets = pets;
          this.filterPets('', 'Всі');
        }),
        catchError(this.handleError));
  }

  // Новий
  public getPetById(id: number): Observable<Beast> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    return this.http.get<Beast>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError));
  }

  // Метод для фільтрації
  public filterPets(searchText: string, filterType: string): void {
    let petsToFilter = this.allPets;

    // Фільтрація за типом (якщо не 'Всі')
    if (filterType !== 'Всі') {
      petsToFilter = petsToFilter.filter(beast => beast.type === filterType);
    }

    // Фільтрація за текстом пошуку
    if (searchText && searchText.trim() !== '') {
      const lowerCaseSearchText = searchText.toLowerCase().trim();
      petsToFilter = petsToFilter.filter(beast => {
        const comment = beast.comment ?? '';
        return (
          (beast.name ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.breed ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.type ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.liketoy ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.diet ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          (beast.sound ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          // (beast.comment ?? '').toLowerCase().includes(lowerCaseSearchText) ||
          comment.toLowerCase().includes(lowerCaseSearchText)
        );
      });
    }
    this._filteredPetsSubject.next(petsToFilter);
  }

  public addPet(newPet: Beast): Observable<Beast> {
    return this.http.post<Beast>(this.apiUrl, newPet)
      .pipe(
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Server error:', error);
    let errorMessage = 'Невідома помилка на сервері.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Помилка клієнта: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'Помилка мережі (сервер не відповідає).';
      } else if (error.status === 404) {
        errorMessage = `Ресурс не знайдено (404).`;
      } else {
        errorMessage = `Код помилки: ${error.status}. Повідомлення: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
  public deletePet(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // URL: http://localhost:3000/pets/ID
    return this.http.delete(url) // Використовуємо метод DELETE
      .pipe(
        catchError(this.handleError)
      );
  }
}
