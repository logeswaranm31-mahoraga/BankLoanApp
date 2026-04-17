import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankLoan } from '../../services/bank-loan';

@Component({
  selector: 'app-new-application',
  imports: [ReactiveFormsModule],
  templateUrl: './new-application.html',
  styleUrl: './new-application.css',
})
export class NewApplication implements OnInit {
  public formBuilder = inject(FormBuilder);
  public bankLoanService = inject(BankLoan);

  public newApplication!: FormGroup;

  public loan: FormGroup = new FormGroup<any>({
    "loanID": 0,
    "applicantID": 0,
    "bankName": "",
    "loanAmount": 0,
    "emi": 0
  })

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newApplication = this.formBuilder.group({
      applicantID: [0],
      fullName: ['', [Validators.required]],
      applicationStatus: [''],
      panCard: ['', [Validators.required]],
      dateOfBirth: [new Date('2026-04-13T13:36:52.156Z')],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      annualIncome: [0, [Validators.required]],
      employmentStatus: ['', [Validators.required]],
      creditScore: [0],
      assets: [''],
      dateApplied: [new Date()],
      loans: this.formBuilder.array([]),
      customerId: [0]
    });
    this.addLoanForm();
  }

  get loans(): FormArray {
    return this.newApplication.get('loans') as FormArray;
  }

  createLoanForm(): FormGroup {
    return this.formBuilder.group({
      "loanID": [0],
      "applicantID": [0, [Validators.required]],
      "bankName": ["", [Validators.required]],
      "loanAmount": [0, [Validators.required]],
      "emi": [0, [Validators.required]]
    })
  }

  addLoanForm() {
    this.loans.push(this.createLoanForm())
  }

  removeLoan(index: number) {
    this.loans.controls = this.loans.controls.splice(index, 1);
  }

  resetForm() {
    this.loans.clear();
    this.newApplication.reset();
    this.addLoanForm();
  }

  submitForm() {
    let loggedUser: any = JSON.parse(localStorage.getItem('bankUser') || '');
    if (loggedUser && loggedUser?.userId) {
      this.newApplication.patchValue({
        customerId: loggedUser?.userId,
        applicationStatus: "New"
      });
    }
    else {
      localStorage.removeItem('bankUser');
      alert('User logged out');
      window.location.reload();
    }
    this.bankLoanService.addNewApplication(this.newApplication.value).subscribe({
      next: (res: any) => {
        if (res?.result) {
          alert('Application added')
        }
        else {
          alert('API faild');
        }
      },
      error: () => {
        alert('API faild')
      }
    })

  }
}
