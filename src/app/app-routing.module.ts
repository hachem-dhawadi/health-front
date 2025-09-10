import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { MultiStepFormComponent } from './components/multi-step-form/multi-step-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';

const routes: Routes = [
  { path: 'questions', component: QuestionListComponent },
  { path: 'create-question', component: QuestionFormComponent },
  { path: 'multi-step-form', component: MultiStepFormComponent }, // <-- Add this
  { path: '', redirectTo: 'questions', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
