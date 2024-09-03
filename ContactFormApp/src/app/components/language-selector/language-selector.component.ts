import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  languages = [];
  selectedLanguage: number;

  constructor(private apiService: ApiService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.apiService.getLanguages().subscribe(data => {
      this.languages = data;
      this.selectedLanguage = this.languageService.getSelectedLanguage();
    });
  }

  onLanguageChange() {
    this.languageService.setSelectedLanguage(this.selectedLanguage);
  }
}