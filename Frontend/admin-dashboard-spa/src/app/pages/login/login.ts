import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:3000/api/auth/signin', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        const userRole = res.user.role; 

        if (userRole === 'Admin') {
          // if userRole is Admin then save the token and set role of userRole which will be admin and navigate to dashboard page
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', userRole);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Access Denied: You are not an Admin!');
        }
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || 'Login failed');
      }
    });
  }
}
