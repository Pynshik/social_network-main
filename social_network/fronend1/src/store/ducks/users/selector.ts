import { RootState } from "../../../store/store";
import { UsersStateInterface } from "./contracts/state";

export const selectUsersState = (state: RootState): UsersStateInterface => state.users;

export const selectUsersItems = (state: RootState): UsersStateInterface['items'] => state.users.items;