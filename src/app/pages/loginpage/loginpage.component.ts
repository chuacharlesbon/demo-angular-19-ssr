import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-loginpage',
  imports: [TranslateModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  meta = inject(Meta);
  appTitle = inject(Title);
  textLogin = '';

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

    // Subscribe to socket messages from server
    this.socketSub = this.socketService.listen<string>('message').subscribe(msg => {
      // handle message
      console.log('This is the message',msg);
    });
  }

  ngOnDestroy() {
    this.onLangChange.unsubscribe(); // Prevent memory 
    this.socketSub.unsubscribe();
  }
}
