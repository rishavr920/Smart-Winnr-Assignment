//we have user in the Admin Dashboard

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

// creating mongoose schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Username should be of atleast 3 and more characters"]
    },

    email: {
        type: String,
        required: [true, "An email address is required."],
        unique: true,
        trim: true,
        lowercase: true, 
        match: [/^.+@.+\..+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false //optional: excludes the password from query result by default
    },
    role: {
        type: String,
        enum: ['Admin','Editor','User'],
        default: 'User'
    },
    lastLogin: Date,
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// password hashing

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

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

// done with mongoose schema,
// now creating mongoose model
// (After creating the schema, use the mongoose.model() function to compile the schema into a model)

const User = mongoose.model('User', UserSchema);
const Sales = mongoose.model('Sales', SalesSchema);


// next we will export the models

export { User, Sales };