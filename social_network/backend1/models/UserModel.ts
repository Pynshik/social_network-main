import { model, Schema, Document } from "mongoose";

export interface UserModelInterface {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password?: string;
  avatarUrl?: string;
  location?: string;
  about?: string;
  website?: string;
  tweets?: string[];
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelDocumentInterface>(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    fullname: {
      required: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      // required: true,
      type: String,
    },
    avatarUrl: String,
    location: String,
    about: String,
    website: String,
    tweets: [
      {
          type: String,
      }
  ],
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: function (_: any, obj: any) {
    delete obj.password;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>("User", UserSchema);
