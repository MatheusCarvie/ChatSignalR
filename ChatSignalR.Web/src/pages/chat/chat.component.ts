import { Component, signal } from "@angular/core";
import IMessage from "../../app/models/message";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: "app-chat",
    imports: [MatInputModule, MatIconModule],
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.scss"
})

export default class ChatComponent {
    messages = signal<IMessage[]>([
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
        {author: "Eu", text: "Teste", date: new Date()},
        {author: "Maria", text: "ABC", date: new Date()},
    ]);
}