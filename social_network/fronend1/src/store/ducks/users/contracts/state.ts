import { LoadingStatus } from "../../../types";
import { UserInterface } from "../../user/contracts/state";

export interface UsersStateInterface {
    items: UserInterface[];
    LoadingStatus: LoadingStatus;
}