import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@app/core/configurations/shared.config';
import { LitigationRequestParty } from '../../arbitration/models/enums/arbitrator-recusal';

@Injectable({
    providedIn: 'root'
})
export class DelegationRequestService {

    constructor(private http: HttpClient) { }

    getDelegationRequests(pageIndex: number,pageSize: number): Observable<any> {
        let queryParams = new HttpParams();
            queryParams = queryParams.append("pageIndex", pageIndex);
            queryParams = queryParams.append("pageSize", pageSize);
        return this.http.get<any>(Configuration.APIs.Delegation.GetDelegationRequests,{ params: queryParams });
    }

    GetActiveDelegatorsForAdmin(pageIndex: number,pageSize: number): Observable<any> {
        let queryParams = new HttpParams();
            queryParams = queryParams.append("pageIndex", pageIndex);
            queryParams = queryParams.append("pageSize", pageSize);
        return this.http.get<any>(Configuration.APIs.Delegation.GetActiveDelegatorsForAdmin,{ params: queryParams });
    }
    GetLitigationRequestsWithoutDelegatorsForAdmin(pageIndex: number,pageSize: number): Observable<any> {
        let queryParams = new HttpParams();
            queryParams = queryParams.append("pageIndex", pageIndex);
            queryParams = queryParams.append("pageSize", pageSize);
        return this.http.get<any>(Configuration.APIs.Delegation.GetLitigationRequestsWithoutDelegatorsForAdmin,{ params: queryParams });
    }
    GetInActiveDelegatorsForAdmin(litigationRequestId:string,delegationParty: LitigationRequestParty | null): Observable<any> {
        debugger;
        let queryParams = new HttpParams();
            queryParams = queryParams.append("litigationRequestId", litigationRequestId);
            if(delegationParty !== null){

                queryParams = queryParams.append("delegationParty", delegationParty);

            }
        return this.http.get<any>(Configuration.APIs.Delegation.GetInActiveDelegatorsForAdmin,{ params: queryParams });
    }
    stopDelegator(delegationRequestId: string): Observable<any> {
        let queryParams = new HttpParams();
            queryParams = queryParams.append("delegationRequestId", delegationRequestId);
        return this.http.get<any>(Configuration.APIs.Delegation.StopDelegator,{ params: queryParams });
    }
    changeDelegator(delegationRequestId: string): Observable<any> {
        let queryParams = new HttpParams();
            queryParams = queryParams.append("delegationRequestId", delegationRequestId);
        return this.http.get<any>(Configuration.APIs.Delegation.ChangeDelegator,{ params: queryParams });
    }

    getDelegationRequestById(delegationRequestId: string): Observable<any> {
         let queryParams = new HttpParams();
            queryParams = queryParams.append("delegationRequestId", delegationRequestId);
        return this.http.get<any>(Configuration.APIs.Delegation.GetDelegationRequestById,{ params: queryParams });
    }
    approveOrRejectDelegationRequest(delegationRequestId: string, isApproved: boolean, reason: string|null): Observable<any> {
         let queryParams = new HttpParams();
            queryParams = queryParams.append("delegationRequestId", delegationRequestId);
            queryParams = queryParams.append("isApproved", isApproved);
            queryParams = queryParams.append("reason", reason ?? "");
        return this.http.get<any>(Configuration.APIs.Delegation.ApproveRejectDelegationRequest,{ params: queryParams });
    }
}