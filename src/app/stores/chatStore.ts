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
        this.searchResultSubject.next(result);
        this.loadingSubject.next(false);
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

    async sendMsg(msg: string, sender: string, receiver: string) {
        this.loadingSubject.next(true);
        await this.chatService.sendMsg(msg, sender, receiver);
        this.getAllChats(receiver);
    }
}