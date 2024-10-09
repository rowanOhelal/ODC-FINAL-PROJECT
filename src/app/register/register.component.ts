// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

//   constructor(private _auth: AuthService, private router: Router) {}

//   author = {
//     name: '',
//     lastname: '',
//     email: '',
//     password: '',
//     about: ''
//   }

//   image: any;
//   select(e:any){
//     this.image = e.target.files[0];
//   }

//   register(){
//     let fd = new FormData();
//     fd.append('name', this.author.name);
//     fd.append('lastname', this.author.lastname);
//     fd.append('email', this.author.email);
//     fd.append('password', this.author.password);
//     fd.append('about', this.author.about);
//     fd.append('image', this.image);

//     console.log('Form Data:', fd);

//     this._auth.register(fd)
//       .subscribe(
//         (res) => {
//         this.router.navigate(['/login']);
//       }
//     )
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _auth: AuthService, private router: Router) {}

  author = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    about: ''
  };

  image: any;
  errorMessage: string = '';

  select(e: any) {
    this.image = e.target.files[0];
  }

  register(){
    let fd = new FormData();
    fd.append('name', this.author.name);
    fd.append('lastname', this.author.lastname);
    fd.append('email', this.author.email);
    fd.append('password', this.author.password);
    fd.append('about', this.author.about);
    fd.append('image', this.image);

    this._auth.register(fd).subscribe(
      (res: any) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        if (err.error.code === 11000) {  // MongoDB's unique index error for duplicate emails
          this.errorMessage = 'Email already in use. Please use a different email.';
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      }
    );
  }
}
