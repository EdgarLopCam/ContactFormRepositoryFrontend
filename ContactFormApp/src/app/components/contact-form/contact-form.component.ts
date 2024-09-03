import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  translationTexts = {};

  constructor(private fb: FormBuilder, private apiService: ApiService, private languageService: LanguageService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      comments: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      attachment: [null]
    });
  }

  ngOnInit(): void {
    this.languageService.selectedLanguage$.subscribe(languageId => {
      this.apiService.getLanguageTexts(languageId).subscribe(data => {
        this.translationTexts = {};
        data.forEach(text => {
          this.translationTexts[text.key] = text.text;
        });
      });
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.contactForm.patchValue({
        attachment: file
      });
    }
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData = new FormData();
      formData.append('email', this.contactForm.get('email').value);
      formData.append('firstName', this.contactForm.get('firstName').value);
      formData.append('lastName', this.contactForm.get('lastName').value);
      formData.append('comments', this.contactForm.get('comments').value);

      const file = this.contactForm.get('attachment').value;
      if (file) {
        formData.append('attachment', file, file.name);
      }

      this.apiService.submitContactForm(formData).subscribe(response => {
        alert('Form submitted successfully!');
      }, error => {
        alert('Error submitting form');
      });
    }
  }
}
