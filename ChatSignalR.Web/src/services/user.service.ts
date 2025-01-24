import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: "root"})
export default class UserService {
    private _user = new BehaviorSubject<string | undefined>(undefined);
    user = this._user.asObservable();

    setUser(name: string){
        this._user.next(name);
    }
}