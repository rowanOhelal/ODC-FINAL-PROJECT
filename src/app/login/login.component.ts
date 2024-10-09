// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

//   constructor(private _auth: AuthService, private router: Router) {}

//   author = {
//     email: '',
//     password: ''
//   }

//   token: any;

//   login(){
//     this._auth.login(this.author)
//       .subscribe((res) => {
//         this.token = res;
//         localStorage.setItem('token', this.token.mytoken);
//         this.router.navigate(['/home']);
//       })
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _auth: AuthService, private router: Router) {}

  author = {
    email: '',
    password: ''
  };
  token: any;
  errorMessage: string = '';

  login(){
    if(this.author.email && this.author.password){
      this._auth.login(this.author).subscribe(
        (res: any) => {
          this.token = res;
          localStorage.setItem('token', this.token.mytoken);
          this.router.navigate(['/home']);
        },
        (err) => {
          if (err.error === 'email or password invalid') {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      );
    }
  }
}
