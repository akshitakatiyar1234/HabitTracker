import habitRepository from "./habit.repository.js";

const habitRepo = new habitRepository();

export default class habitController{

    //TO ADD HABIT
    async addHabit(req,res){
        const {newHabit}= req.body;
        const userId= req.params.userId;
        //console.log(newHabit+" "+userId);
        const result = await habitRepo.addHabit(newHabit,userId);

        if(result){
            res.json({success:true});
        }
        else{
            res.json({success:false});
        }
    }

    //TO FETCH ALL HABITS OF A USER
    async allHabit(req,res){
       
        const userId= req.params.userId;
        const result =await habitRepo.allHabit(userId);
        //console.log(result);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.json({success:false});
        }
    }

    //TO DELETE A HABIT
    async deleteHabit(req,res){
       
        const {habit}= req.body;
        const userId= req.params.userId;
        const result =await habitRepo.deleteHabit(habit,userId);
        //console.log(result);
        if(result){
            res.status(200).json({success:true});
        }
        else{
            res.json({success:false});
        }
    }
}