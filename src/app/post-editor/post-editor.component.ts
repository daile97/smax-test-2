import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
})
export class PostEditorComponent {
  @Input() method?: string;
  @Input() postId?: number;

  post: Post = {} as Post;
  loading: boolean = false;
  postForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    picture: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    detail: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    if (this.postId)
      this.postService.getPostById(this.postId).subscribe((post) => {
        this.postForm.setValue({
          title: post.title,
          picture: post.picture,
          description: post.description,
          detail: post.detail,
        });
      });
  }

  onSubmit(): void {
    this.loading = true;
    const formValue = this.postForm.getRawValue();
    this.post = {
      id: String(this.postId) || '',
      ...formValue,
    };
    if (this.method === 'post')
      this.postService.addPost(this.post).subscribe(() => {
        this.loading = false;
        this.router.navigate([`posts`]);
      });
    if (this.method === 'put')
      this.postService.editPost(this.post).subscribe((post) => {
        this.loading = false;
        this.router.navigate([`posts/${post.id}`]);
      });
    this.postForm.reset();
  }
}
