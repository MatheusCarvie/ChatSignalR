import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import IMessage from "../app/models/message";
import Swal from "sweetalert2";

@Injectable({providedIn: "root"})
export default class SignalRService {
    private hubConnection?: signalR.HubConnection;

    StartConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7168/chatHub")
        .withAutomaticReconnect()
        .build();

        this.hubConnection.start()
        .then(() => {
            const toastMin = Swal.mixin({
                position: "top-right",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
            });
            toastMin.fire({icon: "success", title: "Conectado ao ChatHub"});
        })
        .catch(()=> {
            Swal.fire({
                title: "Error",
                text: "Falha ao se conectar ao ChatHub",
                icon: "error",
                draggable: false,
                showConfirmButton: false,
            });
        })
    }

    addMessageLister(callback: (message: IMessage) => void) {
        this.hubConnection?.on("ReceiveMessage", callback);
    }

    sendMessage(message: IMessage) {
        this.hubConnection?.invoke("SendMessage", message).catch(() => {
            const toastMin = Swal.mixin({
                position: "bottom-right",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
            });
            toastMin.fire({icon: "error", title: "Falha ao tentar enviar a mensagem"});
        });
    }
}