import { LoadingStatus } from "../../../types";

export interface UserInterface {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  avatarUrl: string;
  location: string;
  about: string;
  website: string;
}

export interface UserStateInterface {
  data: UserInterface | undefined;
  status: LoadingStatus;
}
