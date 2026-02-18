import { TodoType } from "@/types/database";
import mongoose, { Model } from "mongoose";


const TodoSchema = new mongoose.Schema<TodoType>({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,  // Fixed: use Types.ObjectId
    //     ref: "UserModel",
    //     required: true,
    // },
    user_email: {
        type: String,
        required: true
    },
    content: {
        type: String,  // Added: specify the type
        required: true,
    },
    isCompleted: {
        type: Boolean,  // Better to be explicit
        default: false  // Optional: add a default value
    },
    category: {
        type: String
    },
    createdAt: {
        type: Date,  // Added: specify the type
        default: Date.now
    },
    modifiedAt: {
        type: Date,  // Added: specify the type
        default: Date.now
    }
});

const TodoModel: Model<TodoType> = mongoose.models.TodoModel || mongoose.model<TodoType>('todos',TodoSchema);

export default TodoModel;