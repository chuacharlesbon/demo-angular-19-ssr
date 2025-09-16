import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatStore } from '../../../stores/chatStore';
import { combineLatest, map, Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { ChatcardComponent } from '../../../component/chatcard/chatcard/chatcard.component';
import { FormsModule } from '@angular/forms';
import { ProfileStore } from '../../../stores/profileStore';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-chatthread',
  imports: [CommonModule, ChatcardComponent, FormsModule],
  templateUrl: './chatthread.component.html',
  styleUrl: './chatthread.component.css'
})
export class ChatthreadComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  location: Location = inject(Location);

  // Profile
  profileStore = inject(ProfileStore);
  profile = this.profileStore.profile$;
  profileSub = Subscription.EMPTY;
  profileData: User = {};

  // Chats
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

  ngOnDestroy() {
    this.profileSub.unsubscribe(); // Prevent memory leaks
  }

  getChats() {
    this.chatStore.getAllChats(this.userId);
  }

  goBack() {
    this.location.back();
  }

  async onSubmit() {
    const result = await this.chatStore.sendMsg(
      this.message,
      this.profileData.email ?? "_system",
      this.userId,
    );
  }
}
