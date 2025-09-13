import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-19-app';

  meta = inject(Meta);
  appTitle = inject(Title);

  ngOnInit(): void {
    this.appTitle.setTitle('Main - My Angular App');
    this.meta.updateTag({ name: 'description', content: 'Main Page - Learn more about us on this page.' });
    this.meta.updateTag({ property: 'og:title', content: 'Main - My Angular App' });
  }

}
