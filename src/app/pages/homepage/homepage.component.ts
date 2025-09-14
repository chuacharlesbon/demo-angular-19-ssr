import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  meta = inject(Meta);
  appTitle = inject(Title);

  ngOnInit(): void {
    this.appTitle.setTitle('HOME - My Angular App');
    this.meta.updateTag({ name: 'description', content: 'HOME Page - Learn more about us on this page.' });
    this.meta.updateTag({ property: 'og:title', content: 'HOME- My Angular App' });
  }
}
