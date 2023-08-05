import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: string = '';

  add(text: string): void {
    this.message = text;
  }

  clear(): void {
    this.message = '';
  }
}
