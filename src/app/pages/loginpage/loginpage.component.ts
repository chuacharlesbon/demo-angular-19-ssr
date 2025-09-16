import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket/socket.service';
import { UserService } from '../../services/user/user.service';
import { ProfileStore } from '../../stores/profileStore';
import { Router, RouterModule } from '@angular/router';
import { routeNames } from '../../app.routes';

@Component({
  selector: 'app-loginpage',
  imports: [TranslateModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  meta = inject(Meta);
  appTitle = inject(Title);
  router = inject(Router);
  userServices = inject(UserService);
  profileStore = inject(ProfileStore);

  textLogin = '';
  loading = false;
  email = "";
  password = "";
  forgotPasswordLink = '/'; // `/${routeNames.forgotPassword.path}`;

  // Socket
  private socketService = inject(SocketService);
  private socketSub: Subscription = new Subscription();

  // Language
  private translate = inject(TranslateService);
  onLangChange: Subscription = new Subscription();

  ngOnInit(): void {
    // Ensure language is set first
    this.onLangChange = this.translate.use('ja').subscribe(() => {
      this.translate.get(['LOGIN', 'METADESC']).subscribe(translations => {
        const translatedTitle = translations['LOGIN'];
        const translatedDesc = translations['METADESC'];

        this.appTitle.setTitle(`${translatedTitle} - My Angular App`);
        this.meta.updateTag({ name: 'description', content: `${translatedTitle} - ${translatedDesc}` });
        this.meta.updateTag({ property: 'og:title', content: `${translatedTitle} - My Angular App` });
      });
    });

    // Get translation once
    this.textLogin = this.translate.instant('LOGIN');;
    // this.translate.get('LOGIN').subscribe(translated => {
    //   this.textLogin = translated;
    // });

    // Subscribing to services to use translated texts as values on change
    // this.translate.onLangChange.subscribe(() => {
    //   const title = this.translate.instant('LOGIN');
    //   this.textLogin = title;
    // });
  }

  ngOnDestroy() {
    this.onLangChange.unsubscribe(); // Prevent memory 
    this.socketSub.unsubscribe();
  }

  async onSubmit() {
    this.loading = true;
    const result = await this.userServices.login(
      this.email,
      this.password
    );

    this.loading = false;

    if (result.success) {
      // Register current user
      this.socketService.register(result?.data?.data?.email);

      this.profileStore.setProfile(result?.data?.data);
      this.router.navigate([routeNames.home.path]);
    }
  }
}
