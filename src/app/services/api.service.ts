import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Questions CRUD
  createQuestion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/questions`, data);
  }

  getAllQuestions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/questions`);
  }

  getQuestion(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/questions/${id}`);
  }

  updateQuestion(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/questions/${id}`, data);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/questions/${id}`);
  }

    // Submit user + answers
  submitUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/submit`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }
}
