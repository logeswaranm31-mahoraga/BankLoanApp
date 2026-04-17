import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  @Input() userDetails:any = null;
  @Output() onLogout = new EventEmitter();
  user = signal({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD'
  });

  isNavbarOpen = signal(false);

  constructor(private router: Router) {
  
  }

  ngOnInit(): void {
      if(this.userDetails){
      this.user.set(
        {
          name: this.userDetails.userName,
          email:this.userDetails.email,
          avatar: this.userDetails?.userName[0]
        }
      )
    }
  }

  toggleNavbar(): void {
    this.isNavbarOpen.update(state => !state);
  }

  closeNavbar(): void {
    this.isNavbarOpen.set(false);
  }

  logout(): void {
    localStorage.removeItem('bankUser');
    console.log('User logged out');
    this.closeNavbar();
    // Redirect to login/home
    this.router.navigate(['/home']);
  }
}
