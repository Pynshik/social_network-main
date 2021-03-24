import { RootState } from "../../store";
import { LoadingStatus } from "../../types";
import { UserStateInterface } from "./contracts/state";

export const selectUserState = (state: RootState): UserStateInterface => state.user;

export const selectUserData = (state: RootState): UserStateInterface['data'] => selectUserState(state).data;

export const selectIsAuth = (state: RootState): boolean => !!selectUserState(state).data;

export const selectUserLoadingStatus = (state: RootState): UserStateInterface['status'] => selectUserState(state).status;

export const selectIsLoaded = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.LOADED;


