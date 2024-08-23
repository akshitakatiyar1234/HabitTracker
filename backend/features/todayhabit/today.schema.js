import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const todaySchema = new mongoose.Schema({
    "habit":String,
    "monday":{type: String , default:"none"},
    "tuesday":{type: String , default:"none"},
    "wednesday":{type: String , default:"none"},
    "thrusday":{type: String , default:"none"},
    "friday":{type: String , default:"none"},
    "saturday":{type: String , default:"none"},
    "sunday":{type: String , default:"none"},
    "userId" :{type : ObjectId , ref :'users'},
});

export const todayModel=new mongoose.model('todayhabits',todaySchema);
//export default todayModel;
