export interface BaseResponse<T> {
    exception? : string;
    data?:T;
    isDone:boolean;
    message:string
}
