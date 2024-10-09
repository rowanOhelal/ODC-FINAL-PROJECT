import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-createarticle',
  standalone: true,
  imports: [FormsModule, CommonModule, AngularEditorModule],
  templateUrl: './createarticle.component.html',
  styleUrl: './createarticle.component.css'
})
export class CreatearticleComponent {

  constructor(private _auth: AuthService, private data: DataService, private router: Router) {}

  article: any = {
    title: '',
    content: '',
    tags: [],
    description: ''
  }

  tag: any = '';

  image: any;

  select(e: any){
    this.image = e.target.files[0];
  }

  create(){
    let fd = new FormData();
    fd.append('title', this.article.title);
    fd.append('content', this.article.content);
    fd.append('tags', this.article.tags.toString());
    fd.append('description', this.article.description);
    fd.append('image', this.image);
    fd.append('idAuthor', this._auth.getAuthorDataFromToken()._id);

    this.data.create(fd)
      .subscribe(
        (res) => {
        this.router.navigate(['/home']);
      },
        (err) => {
          console.log(err);
        }
    )
  }
}
