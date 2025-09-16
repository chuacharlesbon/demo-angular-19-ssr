import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { authGuard } from './core/auth.guard';
import { ChatthreadComponent } from './pages/chatthread/chatthread/chatthread.component';

export const routeNames = {
    home: {
        path: 'home',
        title: "Home",
        component: HomepageComponent,
    },
    login: {
        path: '',
        title: "Login",
        component: LoginpageComponent,
    },
    chatThread: {
        path: 'chat-thread/:id',
        title: "Chats",
        component: ChatthreadComponent,
    },
}

export const routes: Routes = [
    {
        path: routeNames.home.path,
        component: routeNames.home.component,
        title: `Admin | ${routeNames.home.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.login.path,
        component: routeNames.login.component,
        title: `Admin | ${routeNames.login.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.chatThread.path,
        component: routeNames.chatThread.component,
        title: `Admin | ${routeNames.chatThread.title}`,
        // canActivate: [authGuard],
    },
];
