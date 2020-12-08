import { model, Document, Schema, } from "mongoose";

export interface IProfile extends Document {
  email         : string,
  nickname      : string,
  is_activated? : boolean,
  elo?          : number,
}

const ProfileSchema: Schema = new Schema({
  email : {
    type        : String,
    unique      : true,
    trim        : true,
    lowercase   : true,
    required    : true,
  },
  nickname: {
    type        : String,
    trim        : true,
    required    : true,
  },
  is_activated: {
    type        : Boolean,
    default     : false,
  },
  elo: {
    type        : Number,
    default     : 0,
  },
});

export default model<IProfile>("profile", ProfileSchema);