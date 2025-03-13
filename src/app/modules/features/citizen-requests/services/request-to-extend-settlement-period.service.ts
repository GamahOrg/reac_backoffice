import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '@app/shared/models/pagination.model';
import { map, Observable } from 'rxjs';
import { LitigationRequestMircoDto } from '../models/litigation-request-mirco-dto';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { LitigationRequestForExtendPeriodRequestDto } from '../models/litigation-request-for-extend-period-request-dto';
import { LitigationRequestExtendPeriodRequestCreateUpdateEmployeeDto } from '../models/litigation-request-extend-period-request-create-update-employee-dto';
import { LitigationRequestMircoDtoReformer } from '../models/litigation-request-mirco-dto-reformer';

@Injectable()
export class RequestToExtendSettlementPeriodService {

  constructor(private _httpClient : HttpClient) {
  }

  getLitigationRequestExtendPeriodForEmployee(pageIndex: number, pageSize: number): Observable<Pagination<LitigationRequestMircoDto[] >> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDto[]>>>(`${Configuration.APIs.Reconciliation.GetLitigationRequestExtendPeriodForEmployee}`, { params: queryParams }).pipe(
      map((res: BaseResponse<Pagination<LitigationRequestMircoDto[]>>) => {
       if(res.isDone){
         return res.data as Pagination<LitigationRequestMircoDto[]>;
       }
       else
       return {} as Pagination<LitigationRequestMircoDto[]>;
      })
    );
  }

  GetLitigationRequestReformerAssigningRequestsAll(pageIndex: number, pageSize: number,ascending:boolean): Observable<Pagination<LitigationRequestMircoDtoReformer[] >> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    queryParams = queryParams.append("ascending", ascending);

    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDtoReformer[]>>>(`${Configuration.APIs.Reconciliation.GetLitigationRequestReformerAssigningRequestsAll}`, { params: queryParams }).pipe(
      map((res: BaseResponse<Pagination<LitigationRequestMircoDtoReformer[]>>) => {
       if(res.isDone){
        
         return res.data as Pagination<LitigationRequestMircoDtoReformer[]>;
       }
       else
       return {} as Pagination<LitigationRequestMircoDtoReformer[]>;
      })
    );
  }

  addReconciliationExtendPeriodForEmployee(litigationRequestExtendPeriodRequestCreateUpdateEmployee: LitigationRequestExtendPeriodRequestCreateUpdateEmployeeDto): Observable<LitigationRequestForExtendPeriodRequestDto |null> {
   return this._httpClient.post<BaseResponse<LitigationRequestForExtendPeriodRequestDto>>
     (Configuration.APIs.Reconciliation.AddReconciliationExtendPeriodForEmployee, litigationRequestExtendPeriodRequestCreateUpdateEmployee).pipe(
       map((res: BaseResponse<LitigationRequestForExtendPeriodRequestDto>) => {
         if ( res && res.data) {
           return res.data
         } else {
           return null
         }
       })
     )
 } 
 
  getLitigationRequestExtendPeriodForEmployeeByRequestId(requestId:string): Observable<LitigationRequestForExtendPeriodRequestDto | null> {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("requestId", requestId);
  return this._httpClient.get<BaseResponse<LitigationRequestForExtendPeriodRequestDto>>(`${Configuration.APIs.Reconciliation.GetLitigationRequestExtendPeriodForEmployeeByRequestId}`, { params: queryParams }).pipe(
    map((res: BaseResponse<LitigationRequestForExtendPeriodRequestDto>) => {
     if(res.isDone){
       return res.data as LitigationRequestForExtendPeriodRequestDto;
     }
     else
     return {} as LitigationRequestForExtendPeriodRequestDto;
    })
  );
}
}
