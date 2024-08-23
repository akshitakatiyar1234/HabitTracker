import todayRepository from "./today.repository.js";

const todayRepo = new todayRepository();

 export default class todayController{

    async addHabit(req,res){
     const {newHabit} =req.body;
     console.log(newHabit);
     const userId =req.params.userId;
     const result =await todayRepo.addHabit(newHabit,userId);
     if(result){
        res.json({success:true});
     }
     else{
        res.json({success:false});
     }
    }

    async allHabit(req,res){
       
        const userId =req.params.userId;
        const result =await todayRepo.allHabit(userId);
        if(result){
           res.json(result);
        }
        else{
           res.json({success:false});
        }
    }


    async updateHabit(req,res){
      const{habit,day, state}=req.body;
      const userId =req.params.userId;
      const result =await todayRepo.updateHabit(habit,day,state,userId);
      if(result){
         res.json({success:true});
      }
      else{
         res.json({success:false});
      }
  }

  async deleteHabit(req,res){
   const{data}=req.body;
   const userId =req.params.userId;
   const result =await todayRepo.deleteHabit(data,userId);
   if(result){
      res.json({success:true});
   }
   else{
      res.json({success:false});
   }
}
}