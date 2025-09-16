import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatStore } from '../../../stores/chatStore';
import { combineLatest, map, Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { ChatcardComponent } from '../../../component/chatcard/chatcard/chatcard.component';
import { FormsModule } from '@angular/forms';
import { ProfileStore } from '../../../stores/profileStore';
import { User } from '../../../core/interfaces/user';
import { SocketService } from '../../../services/socket/socket.service';

@Component({
  selector: 'app-chatthread',
  imports: [CommonModule, ChatcardComponent, FormsModule],
  templateUrl: './chatthread.component.html',
  styleUrl: './chatthread.component.css'
})
export class ChatthreadComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  location: Location = inject(Location);

  // Socket
  private socketService = inject(SocketService);

  // Profile
  profileStore = inject(ProfileStore);
  profile = this.profileStore.profile$;
  profileSub = Subscription.EMPTY;
  profileData: User = {};

  // Chats
  @ViewChild('threadBottom') threadBottom?: ElementRef;
  private chatsSub = Subscription.EMPTY;

  chatStore = inject(ChatStore);
  chatsList = this.chatStore.chats$;
  searchResultList = this.chatStore.searchResult$;
  loading = this.chatStore.loading$;
  userId = "N/A";
  message = "";

  // Displayed list: use search results if available, otherwise fallback
  displayedChats = combineLatest([
    this.chatsList,
    this.searchResultList
  ]).pipe(
    map(([chats, searchResults]) => {
      const safeChats = Array.isArray(chats) ? chats : [];
      const safeSearch = Array.isArray(searchResults) ? searchResults : [];
      this.scrollToBottom();
      return safeSearch.length > 0 ? safeSearch : safeChats;
    })
  );

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.chatStore.getAllChats(this.userId);
    this.profileSub = this.profile.subscribe((data) => {
      this.profileData = data;
    });
  }

  ngAfterViewInit() {
    // Subscribe once to chat updates
    this.chatsSub = this.displayedChats.subscribe(() => {
      this.scrollToBottom();
    });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe(); // Prevent memory leaks
    this.chatsSub.unsubscribe(); // Prevent memory leaks
  }

  getChats() {
    this.chatStore.getAllChats(this.userId);
  }

  goBack() {
    this.location.back();
  }

  scrollToBottom() {
    if (this.threadBottom) {
      this.threadBottom.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async onSubmit() {
    await this.chatStore.sendMsg(
      this.message,
      this.profileData.email ?? "_system",
      this.userId,
    );

    // Trigger socket
    this.socketService.sendPrivateMessage(
      this.profileData.email ?? "_system",
      this.userId,
      this.message
    );
  }
}
