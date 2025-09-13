import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-19-app';

  meta = inject(Meta);
  appTitle = inject(Title);

  // Language
  private translate = inject(TranslateService);
  currentLang = this.translate.getFallbackLang() || 'en';

  changeLanguage() {
    this.translate.use(this.currentLang === "ja" ? "en" : "ja"); // dynamically switch
  }

  ngOnInit(): void {
    this.translate.use('ja');
    this.appTitle.setTitle('Main - My Angular App');
    this.meta.updateTag({ name: 'description', content: 'Main Page - Learn more about us on this page.' });
    this.meta.updateTag({ property: 'og:title', content: 'Main - My Angular App' });

    // listen for changes
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }
}
