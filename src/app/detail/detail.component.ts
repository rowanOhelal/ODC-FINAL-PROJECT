import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularEditorModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  id: any;
  article: any;
  articleForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private act: ActivatedRoute, private data: DataService, private fb: FormBuilder, private router: Router) {
    this.articleForm = this.fb.group({
      title: [''],
      description: [''],
      content: [''],
      image: [''],
      tags: ['']
    })
  }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.loadArticle();
  }

  loadArticle(){
    this.data.getArticleById(this.id)
      .subscribe(
        (res) => {
          this.article = res;

          this.articleForm.patchValue({
            title: this.article.title,
            description: this.article.description,
            content: this.article.content,
            image: this.article.image,
            tags: this.article.tags.join(', ')
          });
        },
        (err) => {
          console.error('Error loading article: ', err);
        }
      );
  }

  onFileSelected(event: any){
    this.selectedFile = event.taget.files[0];
  }

  // updateArticle() {
  //   if (this.articleForm.valid) {
  //     this.data.update(this.id, this.articleForm.value)
  //       .subscribe(
  //       (res) => {
  //         console.log('Article updated:', res);
  //         this.loadArticle();
  //       },
  //       (err) => {
  //         console.error('Error updating article:', err);
  //       }
  //     );
  //   }else{
  //     console.log('Form is not valid');
  //   }
  // }

  updateArticle() {
    if (this.articleForm.valid) {
      const formData = new FormData();  // Use FormData to handle both fields and files

      // Append the form fields to formData
      formData.append('title', this.articleForm.get('title')?.value);
      formData.append('description', this.articleForm.get('description')?.value);
      formData.append('content', this.articleForm.get('content')?.value);
      formData.append('tags', this.articleForm.get('tags')?.value);

      // Append the file if it's selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else {
        formData.append('image', this.articleForm.get('image')?.value);  // If no new file selected, keep the old image value
      }

      this.data.update(this.id, formData).subscribe(
        (res) => {
          console.log('Article updated:', res);
          this.loadArticle();  // Reload article to show the changes
        },
        (err) => {
          console.error('Error updating article:', err);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  deleteArticle() {
    if(confirm('ARe you sure you want to delete this article?')){
      this.data.delete(this.id).subscribe(
        (res) => {
          console.log('Article deleted:', res);
          this.router.navigate(['/home']);
        },
        (err) => {
          console.error('Error deleting article:', err);
        }
      );
    }
  }
}
