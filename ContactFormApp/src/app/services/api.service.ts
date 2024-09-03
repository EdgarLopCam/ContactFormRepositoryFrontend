import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/language`);
  }

  getLanguageTexts(languageId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/language/${languageId}/texts`);
  }

  submitContactForm(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(`${this.apiUrl}/contactform`, formData, { headers });
  }
}