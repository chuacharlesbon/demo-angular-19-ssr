import { Component, Input } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usercard',
  imports: [CommonModule, RouterModule],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css'
})
export class UsercardComponent {
  @Input() userData!: User;
  threadsLink = '/chat-thread';
}
