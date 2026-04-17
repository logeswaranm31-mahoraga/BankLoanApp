import { Component, inject, OnInit, signal } from '@angular/core';
import { BankLoan } from '../../services/bank-loan';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-list',
  imports: [DatePipe],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css',
})
export class ApplicationList implements OnInit {
  public bankLoanService = inject(BankLoan);
  public applicationList = signal<Array<any>>([])
  ngOnInit(): void {
    let loggedUser = JSON.parse(localStorage.getItem('bankUser')||'')
    if(loggedUser && loggedUser.userId){
      this.bankLoanService.getMyApplications(loggedUser.userId).subscribe({
        next:(res:any)=>{
          if(res.result){
            this.applicationList.set(res.data);
          }
        }
      })
    }
  }

}
