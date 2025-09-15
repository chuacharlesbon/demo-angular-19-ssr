import { inject, Injectable } from "@angular/core";
import { User } from "../core/interfaces/user";
import { BehaviorSubject } from "rxjs";
import { UserService } from "../services/user/user.service";
import { Status } from "../utils/enums";

@Injectable({ providedIn: 'root' })
export class ProfileStore {
    private usersService = inject(UserService);
    private profileSubject = new BehaviorSubject<User>({});
    profile$ = this.profileSubject.asObservable();

    private statusSubject = new BehaviorSubject<Status>(Status.Initial);
    status$ = this.statusSubject.asObservable();

    async setProfile(data: User | null) {
        if(data){
            this.profileSubject.next(data);
        }
    }

    clearProfile() {
        this.profileSubject.next({});
    }

    getProfileSnapshot() {
        return this.profileSubject.getValue();
    }
}