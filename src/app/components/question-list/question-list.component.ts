import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: any[] = [];
  editingQuestion: any = null;
  choicesInput: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.api.getAllQuestions().subscribe(res => this.questions = res);
  }

  deleteQuestion(id: string) {
    if (confirm('Are you sure?')) {
      this.api.deleteQuestion(id).subscribe(() => this.loadQuestions());
    }
  }

editQuestion(question: any) {
  // Make a copy to edit
  this.editingQuestion = { ...question };
  
  // Convert choices array to array of objects for checkboxes
  this.editingQuestion.choices = this.editingQuestion.choices.map((c: string) => ({ text: c, checked: false }));
  
  // Populate the input field
  this.choicesInput = this.editingQuestion.choices.map((c: { text: string; checked: boolean }) => c.text).join(',');
}


  updateChoices() {
    // Update choices array from comma-separated input
    this.editingQuestion.choices = this.choicesInput.split(',')
      .map(c => ({ text: c.trim(), checked: false }));
  }

  saveQuestion() {
    if (!this.editingQuestion) return;

    // Convert choices back to string array for backend
    const payload = {
      ...this.editingQuestion,
      choices: this.editingQuestion.choices.map((c: any) => c.text)
    };

    this.api.updateQuestion(this.editingQuestion._id, payload).subscribe(() => {
      this.loadQuestions();
      this.editingQuestion = null; // close editor
    });
  }

  cancelEdit() {
    this.editingQuestion = null;
  }
}
