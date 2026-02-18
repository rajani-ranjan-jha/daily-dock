export type UserType = {
    // _id: string;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    createdAt: Date;

}

export interface NoteType {
    user_email: string;
    content: string;
    category?: string;
    createdAt: Date;
    modifiedAt: Date;
}

export interface DiaryType {
    user_email: string;
    title?: string;
    content?: string;
    createdAt: Date;
    modifiedAt: Date;
}

export interface TodoType {
    // user_id: ObjectId;
    user_email: string;
    content: string;
    category?: string;
    isCompleted: boolean;
    createdAt: Date;
    modifiedAt: Date;
}