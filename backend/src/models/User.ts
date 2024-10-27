import mongoose, { Document, Model } from "mongoose";

// Define the User interface
export interface User extends Document {
    username: string,
    email: string;
    password: string;
}

// Create the User schema
const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true, // Optional: ensure email is unique
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true,
    }
});

// Create the User model
const UserModel: Model<User> = mongoose.model<User>('User', UserSchema);

export default UserModel;
