import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import IUser from "../app/models/user";

@Injectable({providedIn: "root"})
export default class UserService {
    private _user = new BehaviorSubject<IUser | undefined>(undefined);
    user = this._user.asObservable();

    generateUser(){
        const user: IUser = {id: crypto.randomUUID(), name: "[Anônimo]"}
        this._user.next(user);
    }
}