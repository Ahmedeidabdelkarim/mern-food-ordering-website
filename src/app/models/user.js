import { Schema,models,model} from "mongoose";
import bcrypt from "bcrypt"
const UserSchema = new Schema({
  name:{type: String},
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    validate:pass=>{
      if(!pass?.length || pass.length<5){
        new Error('password must be at least 5 characters');
        return false;
      }
      return true;
    }
  },
  image: {
    type: String,
    default: '',
  }
}, {timestamps: true});

UserSchema.post('validate',function(user){
    const pass=user.password;
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(pass,salt);
    user.password=hash;
    
})



export default models?.User || model('User', UserSchema);