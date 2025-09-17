import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { AddChatModel, Chat, ChatModel } from '../../core/interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);

  url = environment.API_URL;
  defaultChatData: ChatModel = {};

  async getAllChats(id: string): Promise<Chat[]> {
    try {
      const res = this.http.get<ChatModel>(
        `${this.url}/chat-thread/chats/${id}`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result.data ?? [];
    } catch (error) {
      console.log("Get chats error", error);
      return [];
    }
  }

  async sendMsg(msg: string, sender: string, receiver: string): Promise<Chat> {
    try {
      const res = this.http.post<AddChatModel>(
        `${this.url}/chat-thread/create-chat`,
        {
          "sender": {
            "fullName": "_system",
            "email": sender
          },
          "receiver": {
            "fullName": "_system",
            "email": receiver
          },
          "message": msg
        },
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result.data ?? {};
    } catch (error) {
      console.log("Get chats error", error);
      return {};
    }
  }

  async getLatestChat(id: string): Promise<Chat> {
    try {
      const res = this.http.get<AddChatModel>(
        `${this.url}/chat-thread/chats/latest/${id}`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result.data ?? {};
    } catch (error) {
      console.log("Get chat error", error);
      return {};
    }
  }
}
