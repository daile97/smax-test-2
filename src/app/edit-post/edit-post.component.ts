import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {
  postId: number = Number(this.route.snapshot.paramMap.get('id'));
  constructor(private route: ActivatedRoute) { }
}
