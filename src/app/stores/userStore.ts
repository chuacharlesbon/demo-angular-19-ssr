import { inject, Injectable } from "@angular/core";
import { User, UserList } from "../core/interfaces/user";
import { BehaviorSubject } from "rxjs";
import { UserService } from "../services/user/user.service";

@Injectable({ providedIn: 'root' })
export class UsersStore {
    private usersService = inject(UserService);
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    private searchResultSubject = new BehaviorSubject<User[]>([]);
    searchResult$ = this.searchResultSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    async getAllUsers() {
        this.loadingSubject.next(true);
        const result: UserList = await this.usersService.getAllUser();
        this.usersSubject.next(result.data ?? []);
        this.searchResultSubject.next(result.data ?? []);
        this.loadingSubject.next(false);
    }

    async searchUser(keyword: string) {
        this.loadingSubject.next(true);
        const result: UserList = await this.usersService.getAllUser();
        this.searchResultSubject.next(result.data ?? []);
        this.loadingSubject.next(false);
    }

    clearSearches() {
        this.searchResultSubject.next([]);
    }

    getUserSnapshot() {
        return this.usersSubject.getValue();
    }

    getSearchResultSnapshot() {
        return this.searchResultSubject.getValue();
    }

    getLoadingSnapshot() {
        return this.loadingSubject.getValue();
    }
}