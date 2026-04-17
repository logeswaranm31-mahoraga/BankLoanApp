import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankLoan } from '../../services/bank-loan';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  bankLoanService = inject(BankLoan);
  router = inject(Router)
 activeRouter = inject(ActivatedRoute);
  newAppForm: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "password": "",
    "confirmPassword":""
  }
  login: any = {
    userName: '',
    password: ''
  }

  isLoginFormVisible = signal(false);

  accountType:string = '';

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((val:any)=>{
      debugger
      if(val.isLogin === 'true'){
        this.isLoginFormVisible.set(true);
      } else {
        this.isLoginFormVisible.set(false);
      }
    })
  }

  registerUser() {
    let api: Observable<any>;
    if (this.accountType === 'banker') {
      api = this.bankLoanService.registerAsBankUser(this.newAppForm);
    } else {
      api = this.bankLoanService.registerCustomer(this.newAppForm);
    }
   api.subscribe({
      next: (res: any) => {
        alert(res.message);
      },
      error: () => {
        alert("API Error");
      }
    })
  }

  onLogin() {
    this.bankLoanService.login(this.login).subscribe({
      next: (res: any) => {
        if(res.result){
          localStorage.setItem('bankUser', JSON.stringify(res.data))
          alert('login success')
          window.location.reload();
          this.router.navigateByUrl('home')

        }
        else{
          alert('login faild');
        }
      },
      error: () => {
        alert('login faild');
      }
    })

  }
}
