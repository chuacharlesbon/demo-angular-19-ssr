// To parse this data:
//
//   import { Convert, ChatList } from "./file";
//
//   const chatList = Convert.toChatList(json);

export interface AddChatModel {
    message?: string;
    data?:    Chat;
}

export interface ChatModel {
    message?: string;
    data?:    Chat[];
}

export interface Chat {
    sender?:    Receiver;
    receiver?:  Receiver;
    _id?:       string;
    threadKey?: string[];
    message?:   string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
}

export interface Receiver {
    fullName?: string;
    email?:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toChatList(json: string): ChatModel {
        return JSON.parse(json);
    }

    public static chatListToJson(value: ChatModel): string {
        return JSON.stringify(value);
    }
}
