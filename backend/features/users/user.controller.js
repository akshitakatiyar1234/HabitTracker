import userRepository from "./user.repository.js";

const userRepo =new userRepository();
export default class userController{

    async login(req,res){
        const{email,password}=req.body;
        const result = await userRepo.login(email,password);
       
        if(result){
            console.log(result);
            res.set('userId',result._id);
          res.json({success:true});
        }
        else{
            res.json({success:false});
        }
    }

    async registerUser(req,res){
        const {username,email,password}= req.body;
        const result= await userRepo.registerUser(username,email,password);
       
        if(result){
            res.json({success:true});
        }
        else{
            res.json({success:false});
        }
    }
}