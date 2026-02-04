import mongoose from "mongoose";

const { Schema } = mongoose;

// creating mongoose schema

// sales/metrics schema

const SalesSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

const Sales = mongoose.model('Sales', SalesSchema);


export { Sales };