import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) {
      this.setMessage('Logged ' + (this.authService.isLoggedIn ? 'in' : 'out'));
  }

    setMessage(msg) {
        this.message = msg;
    }

    validate(arg) {
      console.log(arg);

    }

    logIn(user) {
        this.setMessage('Trying to log in ...');

        this.authService.login(user, this.password).subscribe(() => {
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                this.setMessage('Logged in');
                let redirect = this.authService.redirectUrl ?
                    this.authService.redirectUrl : '/items';

                // Redirect the user
                this.router.navigate([redirect]);
            } else {
                this.setMessage('username and password do not match');
                this.password = '';
            }
        });
    }

    logout() {
        this.authService.logout();
        this.setMessage('Logged out');
    }
}
