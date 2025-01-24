import { Component, inject, OnInit, signal } from "@angular/core";
import IMessage from "../../app/models/message";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import SignalRService from "../../services/signalR.service";
import { FormsModule } from "@angular/forms";
import UserService from "../../services/user.service";

@Component({
    selector: "app-chat",
    imports: [FormsModule, MatInputModule, MatIconModule],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss"
})

export default class ChatComponent implements OnInit {
    signalRService = inject(SignalRService);
    userService = inject(UserService);

    user?: string;
    message: string = "";
    messages = signal<IMessage[]>([]);

    ngOnInit(): void {
        this.userService.user.subscribe(e => this.user = e);

        this.signalRService.StartConnection();
        this.signalRService.addMessageLister((message) => {
            let tempList = this.messages();
            tempList.push(message); 
            this.messages.set(tempList);
        });
    }

    sendMessage(){
        this.signalRService.sendMessage({author: this.user!, text: this.message!, date: new Date()});
        this.message = "";
    }

    getDate(date: Date){
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
}