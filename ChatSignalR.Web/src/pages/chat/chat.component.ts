import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild } from "@angular/core";
import IMessage from "../../app/models/message";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import SignalRService from "../../services/signalR.service";
import { FormsModule } from "@angular/forms";
import UserService from "../../services/user.service";
import IUser from "../../app/models/user";

@Component({
    selector: "app-chat",
    imports: [FormsModule, MatInputModule, MatIconModule],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss"
})

export default class ChatComponent implements OnInit, AfterViewChecked {
    @ViewChild("main") mainElement!: ElementRef<HTMLDivElement>;

    signalRService = inject(SignalRService);
    userService = inject(UserService);

    user?: IUser;
    message: string = "";
    messages: IMessage[] = [];

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    ngOnInit(): void {
        this.userService.generateUser();
        this.userService.user.subscribe(e => this.user = e);

        this.signalRService.StartConnection();
        this.signalRService.addMessageLister((message) => {
            this.messages.push(message);
            this.messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        });
    }

    private scrollToBottom() {
        const element = this.mainElement.nativeElement;
        element.scrollTop = element.scrollHeight;
    }

    sendMessage(){
        this.signalRService.sendMessage({user: this.user!, text: this.message!, date: new Date()});
        this.message = "";
    }

    getDate(date: Date){
        const newDate = new Date(date);
        const hours = String(newDate.getHours()).padStart(2, "0");
        const minutes = String(newDate.getMinutes()).padStart(2, "0");
        return `${newDate.toLocaleDateString()} - ${hours}:${minutes}h`;
    }
}