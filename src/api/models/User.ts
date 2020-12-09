import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IUser extends Document {
  username    : string,
  password?   : string,
  type        : string,
  role        : string,
  profile     : any,
}

const UserSchema: Schema = new Schema({
  username: {
    type      : String,
    trim      : true,
    unique    : true,
    lowercase : true,
    required  : true,
  },
  password: {
    type      : String,
  },
  type: {
    type      : String,
    lowercase : true,
    enum      : ["account", "facebook", "google"],
    required  : true,
  },
  role: {
    type      : String,
    lowercase : true,
    enum      : ["user", "admin"],
    default   : "user", 
  },
  profile: {
    type      : SchemaTypes.ObjectId,
    ref       : "profile",
    required  : true,
  },
});

export default model<IUser>("user", UserSchema);