import { inject, Injectable } from "@angular/core";
import { ChatService } from "../services/chat/chat.service";
import { Chat } from "../core/interfaces/chat";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: 'root' })
export class ChatStore {
    private chatService = inject(ChatService);
    private chatSubject = new BehaviorSubject<Chat[]>([]);
    chats$ = this.chatSubject.asObservable();

    private searchResultSubject = new BehaviorSubject<Chat[]>([]);
    searchResult$ = this.searchResultSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    async getAllChats(id: string) {
        this.loadingSubject.next(true);
        const result: Chat[] = await this.chatService.getAllChats(id);
        this.chatSubject.next(result);
        this.loadingSubject.next(false);
    }

    async getLatestChat(id: string) {
        const result: Chat = await this.chatService.getLatestChat(id);
        this.chatSubject.next([...this.chatSubject.value, result]);
    }

    clearSearches() {
        this.searchResultSubject.next([]);
    }

    getChatSnapshot() {
        return this.chatSubject.getValue();
    }

    getSearchResultSnapshot() {
        return this.searchResultSubject.getValue();
    }

    getLoadingSnapshot() {
        return this.loadingSubject.getValue();
    }

    async sendMsg(msg: string, sender: string, receiver: string): Promise<Chat> {
        const data = await this.chatService.sendMsg(msg, sender, receiver);
        this.getLatestChat(receiver);
        return data;
    }
}