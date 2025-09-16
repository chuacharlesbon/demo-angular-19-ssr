import { Component, inject, Input } from '@angular/core';
import { Chat } from '../../../core/interfaces/chat';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatcard',
  imports: [CommonModule],
  templateUrl: './chatcard.component.html',
  styleUrl: './chatcard.component.css'
})
export class ChatcardComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  @Input() chatData!: Chat;
  chatId = "N/A";

  ngOnInit(): void {
    this.chatId = this.route.snapshot.params['id'];
  }
}
