import IUser from "./user";

export default interface IMessage {
    user: IUser;
    text: string;
    date: Date
}