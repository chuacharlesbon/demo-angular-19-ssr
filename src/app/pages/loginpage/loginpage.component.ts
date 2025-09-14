import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-loginpage',
  imports: [],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  meta = inject(Meta);
  appTitle = inject(Title);

  ngOnInit(): void {
    this.appTitle.setTitle('Login - My Angular App');
    this.meta.updateTag({ name: 'description', content: 'Login Page - Learn more about us on this page.' });
    this.meta.updateTag({ property: 'og:title', content: 'Login- My Angular App' });
  }
}
