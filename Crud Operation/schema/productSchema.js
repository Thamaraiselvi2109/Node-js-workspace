import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: String , 
    price: Number, 
    category: String, 
    inStock: Boolean 
})


export const Product = mongoose.model("product", ProductSchema);