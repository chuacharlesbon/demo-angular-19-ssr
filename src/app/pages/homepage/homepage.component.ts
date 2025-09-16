import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, map, Subscription } from 'rxjs';
import { ChatStore } from '../../stores/chatStore';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../../stores/userStore';
import { UsercardComponent } from '../../component/usercard/usercard/usercard.component';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, UsercardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  meta = inject(Meta);
  appTitle = inject(Title);

  // Language
  private translate = inject(TranslateService);
  onLangChange: Subscription = new Subscription();

  // Users
  usersStore = inject(UsersStore);
  usersList = this.usersStore.users$;
  searchResultList = this.usersStore.searchResult$;
  loading = this.usersStore.loading$;

  // Displayed list: use search results if available, otherwise fallback
  displayedUsers = combineLatest([
    this.usersList,
    this.searchResultList
  ]).pipe(
    map(([users, searchResults]) => {
      const safeUsers = Array.isArray(users) ? users : [];
      const safeSearch = Array.isArray(searchResults) ? searchResults : [];
      return safeSearch.length > 0 ? safeSearch : safeUsers;
    })
  );

  ngOnInit(): void {
    // Ensure language is set first
    this.onLangChange = this.translate.use('ja').subscribe(() => {
      this.translate.get(['METAHOME', 'METADESC']).subscribe(translations => {
        const translatedTitle = translations['METAHOME'];
        const translatedDesc = translations['METADESC'];

        this.appTitle.setTitle(`${translatedTitle} - My Angular App`);
        this.meta.updateTag({ name: 'description', content: `${translatedTitle} - ${translatedDesc}` });
        this.meta.updateTag({ property: 'og:title', content: `${translatedTitle} - My Angular App` });
      });
    });

    // Load Users if empty
    if (this.usersStore.getUserSnapshot().length === 0) {
      this.usersStore.getAllUsers();
    }
  }

  ngOnDestroy() {
    this.onLangChange.unsubscribe(); // Prevent memory leaks
  }

  getUsers() {
    this.usersStore.getAllUsers();
  }
}
