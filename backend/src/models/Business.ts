import mongoose, { Schema, Document } from "mongoose";

export interface Review extends Document{
    username: string;
    comment: string;
    rating: number; 
}

export interface Business extends Document { // Extend Document for Mongoose integration
    type: string;  // Use lowercase 'string'
    location: string;  // Use lowercase 'string'
    name: string;  // Use lowercase 'string'
    cellNo: string;  // Add cell number field
    reviews: Review[];
}

const ReviewSchema = new mongoose.Schema<Review>({
    username: { 
        type: String, 
        required: true, 
    },
    comment: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1,  // Validate rating to be at least 1
        max: 5   // Validate rating to be at most 5
    },
}, {
    timestamps: true // Add createdAt and updatedAt fields
});

const BusinessSchema: Schema = new Schema({
    type: {
        type: String, 
        required: true
    },
    location: {
        type: String, 
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    cellNo: {  // New cell number field
        type: String, 
        required: true  // Make it required if necessary
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }, 
    reviews: { 
        type: [ReviewSchema], 
        required: true, 
        default: [] 
    },
});

const BusinessModel = mongoose.model<Business>('Business', BusinessSchema); // Model name
export default BusinessModel;
