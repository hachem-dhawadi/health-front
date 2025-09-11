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

  categories = [
  { value: 'personal', label: 'Personal' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'hydration', label: 'Hydration' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'exercise', label: 'Exercise' },
  { value: 'stress', label: 'Stress' },
  { value: 'smoking', label: 'Smoking' },
  { value: 'alcohol', label: 'Alcohol' },
];


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
  this.choices.push(this.fb.control('', Validators.required));
}

removeChoice(index: number) {
  if (this.choices.length > 1) {
    this.choices.removeAt(index);
  }
}

submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched(); // Show validation errors
    return;
  }

  this.api.createQuestion(this.form.value).subscribe(res => {
    alert('Question created!');
    this.form.reset();
    this.choices.clear();
    this.choices.push(this.fb.control('', Validators.required));
  });
}

  
}
