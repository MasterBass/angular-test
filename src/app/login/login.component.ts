import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string;
  login: string;
  message: string;

  constructor(public authService: AuthService, public router: Router) {
      this.message = '';
  }
    onSubmit() {
        this.authService.login(this.login, this.password).subscribe(() => {
            if (this.authService.isLoggedIn) {

                let redirect = this.authService.redirectUrl ?
                    this.authService.redirectUrl : '/items';

                // Redirect the user
                this.router.navigate([redirect]);
            } else {
                this.message = 'username and password do not match';
                this.password = '';
            }
        });
    }

    logout() {
        this.authService.logout();
    }
}
