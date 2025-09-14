import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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

  // Language
  private translate = inject(TranslateService);
  onLangChange: Subscription = new Subscription();

  ngOnInit(): void {
    // Synchronous translation
    const translatedTitle = this.translate.instant('LOGIN');
    const translatedDesc = this.translate.instant('METADESC');

    this.appTitle.setTitle(`${translatedTitle} - My Angular App`);
    this.meta.updateTag({ name: 'description', content: `${translatedTitle} - ${translatedDesc}` });
    this.meta.updateTag({ property: 'og:title', content: `${translatedTitle} - My Angular App` });

    // Get translation once
    this.textLogin = this.translate.instant('LOGIN');;
    // this.translate.get('LOGIN').subscribe(translated => {
    //   this.textLogin = translated;
    // });

    // Subscribing to services to use translated texts as values on change
    this.translate.onLangChange.subscribe(() => {
      const title = this.translate.instant('LOGIN');
      this.textLogin = title;
    });
  }

  ngOnDestroy() {
    this.onLangChange.unsubscribe(); // Prevent memory leaks
  }
}
