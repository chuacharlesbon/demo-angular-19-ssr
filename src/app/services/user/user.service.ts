import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { User, UserList, UserModel } from '../../core/interfaces/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);

  url = environment.API_URL;
  defaultUsersData: UserModel = {};

  async login(email: string, password: string): Promise<any> {
    try {
      const res = this.http.post<any>(
        `${this.url}/chat/login`,
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      this.cookieService.set('user-session', 'true', 1, '/', '', true, "Strict");
      return { success: true, data: result };
    } catch (error) {
      console.log("Login error", error);
      return { success: false, error };
    }
  }

  async getAllUser(): Promise<UserList> {
    try {
      const res = this.http.get<UserList>(
        `${this.url}/chat/users`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result;
    } catch (error) {
      console.log("Get users error", error);
      const emptyList: UserList = {};
      return emptyList;
    }
  }

  async getUserProfile(): Promise<User> {
    try {
      const res = this.http.get<UserModel>(
        `${this.url}/chat/user-profile`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result.data ?? {};
    } catch (error) {
      console.log("Get users error", error);
      return this.defaultUsersData.data ?? {};
    }
  }
}
