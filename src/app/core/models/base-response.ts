export interface BaseResponse<T> {
    exception? : string;
    data?:T;
    isDone:boolean;
    message:string
}

export interface EmptyBaseResponse {
    exception? : string;
    isDone:boolean;
    message:string
}

export interface PagedResultBase<T> {
    results:T[];
    currentPage: number;
    pageCount: number;
    pageSize: number;
    totalCount: number;
}
