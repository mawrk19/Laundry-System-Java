import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private readonly hardcodedUsername: string = 'admin';
  private readonly hardcodedPassword: string = 'admin';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === this.hardcodedUsername && this.password === this.hardcodedPassword) {
      console.log('Login successful');
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}