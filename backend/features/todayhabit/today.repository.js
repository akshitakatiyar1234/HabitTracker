import mongoose from 'mongoose';
import { todayModel } from './today.schema.js';

export default class todayRepository{

    async addHabit(newHabit,userId){
      
      
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const habitexist =await todayModel.find({habit : newHabit,userId: userObjectId});
      
      if(habitexist.length>0){
        return false;
      }
      else{
      const habit =new todayModel({habit : newHabit,userId: userObjectId});
      await habit.save();
      console.log(habit);
      return true;
      }
    }

    async allHabit(userId){
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const habits =await todayModel.find({userId:userObjectId});
        if(habits){
            return habits;
        }
        else{
            return false;
        }
    }

    async updateHabit(habit,day,state,userId){
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const result =await todayModel.updateOne({habit:habit,userId:userObjectId},
            {$set:{[day]:state}}
        );
        if (result.matchedCount > 0 && result.modifiedCount > 0) {
            return true; // Successfully updated
        } else {
            return false; // No document matched or no modification
        }
    }

    async deleteHabit(habit,userId){
        //const userObjectId = new mongoose.Types.ObjectId(userId);
        const habitexist =await todayModel.find({habit:habit});
    //console.log(habitexist);
    if(habitexist.length>0){
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const deletedhabit = await todayModel.deleteOne({ habit:habit,userId: userObjectId });
        return true;
    }
    else{
        return false;
    }
      }
}

// monday:"none",
// tuesday:"none",
// wednesday:"none",
// thrusday:"none",
// friday:"none",
// saturday:"none",
// sunday:"none",