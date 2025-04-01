import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../pages/users.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl =  'http://localhost:3700'; 

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  signup(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getposts`);
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/userpost`, { headers });
  }
}
