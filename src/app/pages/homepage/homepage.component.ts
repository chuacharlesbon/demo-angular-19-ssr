import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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

  ngOnInit(): void {
    // Synchronous translation
    const translatedTitle = this.translate.instant('METAHOME');
    const translatedDesc = this.translate.instant('METADESC');

    this.appTitle.setTitle(`${translatedTitle} - My Angular App`);
    this.meta.updateTag({ name: 'description', content: `${translatedTitle} - ${translatedDesc}` });
    this.meta.updateTag({ property: 'og:title', content: `${translatedTitle} - My Angular App` });
  }
}
