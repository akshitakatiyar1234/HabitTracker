import { userModel } from "./user.schema.js";

export default class userRepository{
    async login(email,password){
     const user =await userModel.findOne({email:email , password:password});
     if(user){
        return user;
     }
     else{
        return false;
     }
    }

    async registerUser(name,email,password){
      const newUser=new userModel({
         name:name,
         email:email,
         password:password
      });
      await newUser.save();
      if(newUser){
       
         return true;
      }
      else{
         return false;
      }
    }
}