import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css']
})
export class MultiStepFormComponent implements OnInit {
  step = 1;
  form!: FormGroup;
  questions: any[] = [];

  currentQuestionIndex = 0;  // for pagination
  questionsPerPage = 4;

  

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    // Personal info form
    this.form = this.fb.group({
      name: ['', Validators.required],
      sexe: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      length: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]]
    });

    // FETCH questions from backend
    this.api.getAllQuestions().subscribe((questions: any[]) => {
      this.questions = questions;

      // Add dynamic form controls for each question
      this.questions.forEach(q => {
        if (q.type === 'checkbox') {
          this.form.addControl(q._id, this.fb.array([], Validators.required));
        } else {
          this.form.addControl(q._id, this.fb.control('', Validators.required));
        }
      });
    });
  }

  // Step navigation
  nextStep() {
    if (this.step === 1) {
      const personalInfoValid =
        this.name?.valid &&
        this.sexe?.valid &&
        this.age?.valid &&
        this.length?.valid &&
        this.weight?.valid;

      if (!personalInfoValid) {
        this.name?.markAsTouched();
        this.sexe?.markAsTouched();
        this.age?.markAsTouched();
        this.length?.markAsTouched();
        this.weight?.markAsTouched();
        return;
      }
    }
    this.step++;
  }

  prevStep() { this.step--; }

  // Pagination for questions
  get pagedQuestions() {
    return this.questions.slice(this.currentQuestionIndex, this.currentQuestionIndex + this.questionsPerPage);
  }

  nextQuestions() {
    if (this.currentQuestionIndex + this.questionsPerPage < this.questions.length) {
      this.currentQuestionIndex += this.questionsPerPage;
    }
  }

  prevQuestions() {
    if (this.currentQuestionIndex - this.questionsPerPage >= 0) {
      this.currentQuestionIndex -= this.questionsPerPage;
    }
  }

  // Checkbox handler
  onCheckboxChange(e: any, qId: string) {
    const arr = this.form.get(qId) as FormArray;
    if (e.target.checked) arr.push(this.fb.control(e.target.value));
    else {
      const index = arr.controls.findIndex(x => x.value === e.target.value);
      arr.removeAt(index);
    }
  }

  // Submit form
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const answers = this.questions.map(q => ({
      questionId: q._id,
      response: this.form.value[q._id]
    }));

    const payload = {
      name: this.form.value.name,
      sexe: this.form.value.sexe,
      age: this.form.value.age,
      length: this.form.value.length,
      weight: this.form.value.weight,
      answers
    };

    this.api.submitUser(payload).subscribe({
      next: res => alert('Erfolgreich gesendet!'),
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert('Fehler beim Senden');
      }
    });
  }
  // Map category codes to English
getCategoryName(category: string): string {
  const map: any = {
    personal: 'Personal',
    nutrition: 'Nutrition',
    hydration: 'Hydration',
    sleep: 'Sleep',
    exercise: 'Exercise',
    stress: 'Stress',
    smoking: 'Smoking',
    alcohol: 'Alcohol'
  };
  return map[category] || category;
}

// Map category codes to German
getCategoryNameGerman(category: string): string {
  const map: any = {
    personal: 'Persönlich',
    nutrition: 'Ernährung',
    hydration: 'Flüssigkeitszufuhr',
    sleep: 'Schlaf',
    exercise: 'Bewegung',
    stress: 'Stress',
    smoking: 'Rauchen',
    alcohol: 'Alkohol'
  };
  return map[category] || category;
}

// Optional: return question number globally
getCategoryNumber(index: number): number {
  return index + 1 + this.currentQuestionIndex; // add current page offset
}


  // Returns true if we are on the last page of questions
isLastPage(): boolean {
  return this.currentQuestionIndex + this.questionsPerPage >= this.questions.length;
}


  // Helpers for template validation
  get name() { return this.form.get('name'); }
  get sexe() { return this.form.get('sexe'); }
  get age() { return this.form.get('age'); }
  get length() { return this.form.get('length'); }
  get weight() { return this.form.get('weight'); }
}


