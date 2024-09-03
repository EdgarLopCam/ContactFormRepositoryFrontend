import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private selectedLanguageSubject: BehaviorSubject<number>;
  public selectedLanguage$: Observable<number>;

  constructor() {
    const defaultLanguage = localStorage.getItem('selectedLanguage') || '1';
    this.selectedLanguageSubject = new BehaviorSubject<number>(+defaultLanguage);
    this.selectedLanguage$ = this.selectedLanguageSubject.asObservable();
  }

  setSelectedLanguage(languageId: number): void {
    localStorage.setItem('selectedLanguage', languageId.toString());
    this.selectedLanguageSubject.next(languageId);
  }

  getSelectedLanguage(): number {
    return this.selectedLanguageSubject.value;
  }
}
