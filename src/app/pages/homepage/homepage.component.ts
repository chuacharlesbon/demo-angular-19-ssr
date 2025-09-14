import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  meta = inject(Meta);
  appTitle = inject(Title);

  // Language
  private translate = inject(TranslateService);
  onLangChange: Subscription = new Subscription();

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
  }

  ngOnDestroy() {
    this.onLangChange.unsubscribe(); // Prevent memory leaks
  }
}
