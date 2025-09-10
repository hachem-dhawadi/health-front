import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      text: ['', Validators.required],
      category: ['', Validators.required],
      type: ['checkbox', Validators.required],
      choices: this.fb.array([this.fb.control('')])
    });
  }

  get choices() {
    return this.form.get('choices') as FormArray;
  }

  addChoice() {
    this.choices.push(this.fb.control(''));
  }

  removeChoice(index: number) {
    this.choices.removeAt(index);
  }

  submit() {
    this.api.createQuestion(this.form.value).subscribe(res => {
      alert('Question created!');
      this.form.reset();
      this.choices.clear();
      this.choices.push(this.fb.control(''));
    });
  }
}
