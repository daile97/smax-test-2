import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from './post';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'https://64cb6d79700d50e3c705e23f.mockapi.io/api/posts';
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.baseUrl)
      .pipe(catchError(this.handleError<Post[]>('Get posts')));
  }

  getPostById(id: number): Observable<Post> {
    return this.http
      .get<Post>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<Post>(`Get post ${id}`)));
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post, this.options).pipe(
      tap((_) => this.messageService.add('Post Added')),
      catchError(this.handleError<Post>('Add post'))
    );
  }

  editPost(post: Post): Observable<Post> {
    return this.http
      .put<Post>(`${this.baseUrl}/${post.id}`, post, this.options)
      .pipe(
        tap((_) => {
          this.messageService.add('Post edited');
        }),
        catchError(this.handleError<Post>('Edit post'))
      );
  }
}
