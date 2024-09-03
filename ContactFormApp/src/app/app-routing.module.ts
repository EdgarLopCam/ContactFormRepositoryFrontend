import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

const routes: Routes = [
  { path: '', component: ContactFormComponent },
  { path: 'select-language', component: LanguageSelectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }