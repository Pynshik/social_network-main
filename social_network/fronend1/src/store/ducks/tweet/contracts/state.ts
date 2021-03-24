import { LoadingStatus } from "../../../types";
import { TweetInterface } from "../../tweets/contracts/state";

export interface TweetStateInterface {
    data?: TweetInterface;
    LoadingStatus: LoadingStatus;   
}