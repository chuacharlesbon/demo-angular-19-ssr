// To parse this data:
//
//   import { Convert, User } from "./file";
//
//   const user = Convert.toUser(json);

export interface Users {
    data?:    User;
    message?: string;
}

export interface User {
    _id?:       string;
    fullName?:  string;
    email?:     string;
    isAdmin?:   boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
    loginAt?:   Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUser(json: string): Users {
        return JSON.parse(json);
    }

    public static userToJson(value: Users): string {
        return JSON.stringify(value);
    }
}
