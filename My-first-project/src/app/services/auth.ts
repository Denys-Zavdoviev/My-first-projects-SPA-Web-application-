import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, map, switchMap, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus$ = this.authStatus.asObservable();
  private currentUser = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
  public currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map((users) => {
        const nameExists = users.some(u => u.name.toLowerCase() === user.name.toLowerCase());
        const emailExists = users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (nameExists) {
          throw new Error('NameAlreadyExists');
        }
        if (emailExists) {
          throw new Error('EmailAlreadyExists');
        }
        return true;
      }),
      switchMap(() => this.http.post(`${this.apiUrl}/users`, user))
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${credentials.email}&password=${credentials.password}`).pipe(
      map((users) => {
        if (users && users.length > 0) {
          const user = users[0];
          localStorage.setItem('token', 'fake-jwt-token');
          localStorage.setItem('userRole', user.role || 'user');
          localStorage.setItem('userName', user.name);
          this.authStatus.next(true);
          this.currentUser.next(user.name);
          return user;
        } else {
          throw new Error('UserNotFound');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    this.authStatus.next(false);
    this.currentUser.next(null);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
}
