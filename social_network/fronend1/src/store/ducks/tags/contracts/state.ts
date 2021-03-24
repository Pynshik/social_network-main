import { LoadingStatus } from "../../../types";

export interface TagInterface {
    _id: string;
    name: string;
    count: number;
}

export interface TagsStateInterface {
    items: TagInterface[];
    LoadingStatus: LoadingStatus;
    
}