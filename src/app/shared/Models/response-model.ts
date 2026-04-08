export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface MvParamReqOption<T>{
  searchText? : string;
  operator? : string;
  offSet : number;
  pageSize : number;
  sortBy? : string;
  sortOrder? : string;
  filter? : T; 
}

export interface MvGridConfig<T>{
  data: T[];
  totalRows : number;
}