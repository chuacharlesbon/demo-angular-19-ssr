import { Component, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';
import { routeNames } from '../../app.routes';
import { User } from '../../core/interfaces/user';
import { ProfileStore } from '../../stores/profileStore';
import { getCookie } from '../../utils/cookie';
import { Status } from '../../utils/enums';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../services/socket/socket.service';
import { ChatStore } from '../../stores/chatStore';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private platformId: Object = inject(PLATFORM_ID);

  // Socket
  private socketService = inject(SocketService);
  private socketSub: Subscription = new Subscription();

  // Chats
  chatStore = inject(ChatStore);

  // Language
  private translate = inject(TranslateService);
  changeLanguage(lang: string) {
    this.translate.use(lang); // dynamically switch
  }

  get currentLanguage(): string {
    return this.translate.currentLang;
  }

  // Track Navigation
  offcanvasService = inject(NgbOffcanvas);
  router = inject(Router);
  isLoginPage = false;
  nonUserRoutes = [
    "/",
    "/logout",
    "/forgot-password",
  ];
  userLink = "/";
  productLink = "/";

  private trackNavigation() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        const navEndEvent = event as NavigationEnd; // ✅ Explicit type assertion
        if (this.nonUserRoutes.includes(navEndEvent.urlAfterRedirects)) {
          this.isLoginPage = true;
        } else {
          this.isLoginPage = false;
        }
      });
  }

  // Drawer Component
  @ViewChild('drawer') drawer: any;

  openDrawer() {
    this.offcanvasService.open(this.drawer, { position: 'start' }); // 'start' = left side
  }

  navigateAndClose(offcanvas: any, path: string) {
    this.router.navigate([path]);
    offcanvas.dismiss();
  }

  // Dropdown
  onAccount() {
    //
  }

  onLogout() {
    const emptyUser: User = {};
    this.profileStore.setProfile(emptyUser);
    this.router.navigate([routeNames.login.path]);
  }

  // Profile
  profileStore = inject(ProfileStore);
  profile = this.profileStore.profile$;
  status = this.profileStore.status$;
  profileSub = Subscription.EMPTY;
  statusSub = Subscription.EMPTY;
  profileData: User = {};

  ngOnInit() {
    this.translate.use('ja');
    this.trackNavigation();
    this.profileSub = this.profile.subscribe((data) => {
      this.profileData = data;

      // Register current user
      this.socketService.register(data?.email ?? "N/A");
    });
    this.statusSub = this.status.subscribe((data) => {
      const hasToken = getCookie('user-session', this.platformId);
      if (data === Status.Initial && hasToken) {
        this.profileStore.getProfile();
      }
    });
    this.translate.onLangChange.subscribe((event) => {
      console.log('Language changed to:', event.lang);
    });

    // Listen for messages
    this.socketSub = this.socketService.onPrivateMessage().subscribe(msg => {
      console.log("This is the socket message", msg);
      this.chatStore.getLatestChat(msg.senderId);
    });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe(); // Prevent memory leaks
    this.statusSub.unsubscribe(); // Prevent memory leaks
    this.socketSub.unsubscribe(); // Prevent memory leaks
  }
}
