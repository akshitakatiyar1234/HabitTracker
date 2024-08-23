import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
const habitSchema = new mongoose.Schema({
    "habit" :String,
    "userId" :{type : ObjectId , ref :'users'}
});
const habitModel =new mongoose.model('habits',habitSchema);
export default habitModel;