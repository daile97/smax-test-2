import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {
  post: Post = {} as Post;
  paras: string[] = [];
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  loading: boolean = true;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.postService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.paras = post.detail.split('\n\n');
      this.loading = false;
    });
  }
}
