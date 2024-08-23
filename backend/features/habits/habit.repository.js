import habitModel from "./habit.schema.js";
import mongoose from 'mongoose';
import { ObjectId } from "mongodb";
//const habitmodel =new habitModel();

export default class habitRepository{

    //TO ADD NEW HABIT
    async addHabit(newHabit,userId){
        const habitexist =await habitModel.find({habit:newHabit});
        //console.log(habitexist);
        if(habitexist.length>0){
            return false;
        }
        else{
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const habit =new habitModel({habit : newHabit,userId: userObjectId});
            await habit.save();
            return true;
        }
       
    }
  

//TO FETCH ALL HABITS OF A USER
    async allHabit(userId) {
        try {
            const userObjectId = new mongoose.Types.ObjectId(userId);
            // Fetch all habits for the user
            const habits = await habitModel.find({ userId: userObjectId });
            return habits; // Always return the result (which will be an array, potentially empty)
        } catch (error) {
            console.log('Error fetching habits:', error);
            throw error; // Propagate error for handling at higher level
        }
    }

// TO DELETE A HABIT

async deleteHabit(habit,userId){
    const habitexist =await habitModel.find({habit:habit});
    //console.log(habitexist);
    if(habitexist.length>0){
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const deletedhabit = await habitModel.deleteOne({ habit:habit,userId: userObjectId });
        return true;
    }
    else{
        return false;
    }
   
}
}