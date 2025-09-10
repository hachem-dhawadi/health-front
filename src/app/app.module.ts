import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MultiStepFormComponent } from './components/multi-step-form/multi-step-form.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionFormComponent,
    UserListComponent,
    MultiStepFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
     ReactiveFormsModule,  // add this
     FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
