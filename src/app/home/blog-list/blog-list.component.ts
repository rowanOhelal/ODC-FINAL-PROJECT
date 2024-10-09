import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  articles: any;
  //
  isLoggedIn: boolean = false;
  //

  constructor(private data: DataService, private _auth: AuthService) {}

  ngOnInit(): void{

    //
    this.isLoggedIn = this._auth.isLoggedIn();
    //

    if(this.isLoggedIn){
      this.data.getAll()
      .subscribe(
        (res) => {
          this.articles = res;
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }
}
