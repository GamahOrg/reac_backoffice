export interface DashbourdRequestDto {
    fromDate?: string| null;
    toDate?:string| null;
    requestCode?:string| null;
    areaIds?: string[] | null; 
    citiesIds?: string[] | null; 
    employeeIds?: string[] | null; 
    litigationRequestCategoryIds?: string[] | null;  
    isAdmin?: boolean | null;
    litigationRequestStatusIds?: string[] | null; 
    litigationRequestAmountId?: string | null;  
    skip?: number;
    take?: number;
    }

    export interface DashbourdResponseDto {
        fromDate: Date;
        toDate:Date;
        }

        export enum RequestCategory {
            ///<summary>صلح</summary>
            Reconciliation = 1,
            ///<summary>تحكيم</summary>
            Arbitration = 2,
            ///<summary>صلح وتحكيم</summary>
            ReconciliationAndArbitration = 3
        
        }