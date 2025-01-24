import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import IMessage from "../app/models/message";

@Injectable({providedIn: "root"})
export default class SignalRService {
    private hubConnection?: signalR.HubConnection;

    StartConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7168/chatHub")
        .withAutomaticReconnect()
        .build();

        this.hubConnection.start()
        .then(() => console.log("Conectado ao ChatHub"))
        .catch(()=> console.error("Falha ao se conectar ao ChatHub"))
    }

    addMessageLister(callback: (message: IMessage) => void) {
        this.hubConnection?.on("ReceiveMessage", callback);
    }

    sendMessage(message: IMessage) {
        this.hubConnection?.invoke("SendMessage", message).catch(() => console.error("Falha ao tentar enviar a mensagem"));
    }
}