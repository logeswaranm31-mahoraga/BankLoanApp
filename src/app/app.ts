import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BankApp');
  loggedUserData: any;
  constructor() {
    let userdata = localStorage.getItem('bankUser');
    if (userdata != null) {
      this.loggedUserData = JSON.parse(userdata);
    }
  }
}
