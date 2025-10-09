import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { CitizenFullLookupArbirator, CitizenReformer } from '../models/citizen.model';

@Injectable()
export class CitizenService {

  constructor(private _httpClient: HttpClient) { }

  getReformersLookup(citizenId: string, requestId: string): Observable<BaseResponse<CitizenReformer[]>> {
    let queryParams = new HttpParams();
    if (citizenId && requestId)
      queryParams = queryParams.append("citizenId", citizenId);
    queryParams = queryParams.append("requestId", requestId);
    return this._httpClient.get<BaseResponse<CitizenReformer[]>>(`${Configuration.APIs.Citizen.GetReformersLookup}`, { params: queryParams })
  }

  getArbitratorsFullLookup(citizenId: string, requestId: string , searchCriteria:any): Observable<BaseResponse<CitizenFullLookupArbirator[]>> {
    let queryParams = new HttpParams();
    if (citizenId && requestId)
      queryParams = queryParams.append("citizenId", citizenId);
      queryParams = queryParams.append("requestId", requestId);

      if( searchCriteria?.fullName && searchCriteria?.fullName!=''){
        queryParams = queryParams.append("fullName", searchCriteria.fullName?.trim())
      }
      else if( searchCriteria?.area && searchCriteria?.area!=''){
        queryParams = queryParams.append("area", searchCriteria.area?.trim())
      }
      else if(searchCriteria?.arbitratorClass && searchCriteria?.arbitratorClass != ''){
        queryParams = queryParams.append("arbitratorClass", searchCriteria.arbitratorClass?.trim());
      }
  

    return this._httpClient.get<BaseResponse<CitizenFullLookupArbirator[]>>(`${Configuration.APIs.Citizen.GetArbitratorsFullLookup}`, { params: queryParams })
  }

  AddLitigationRequestArbitratorsChairmandecision(requestId:string, arbitratorChairmanId:string) :Observable<BaseResponse<any>>{
    let obj = {
      requestId,
      arbitratorChairmanId
    }
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.Arbitration.AddLitigationRequestArbitratorsChairmandecision, obj)
  }

  AddLitigationRequestArbitratorsMemberdecision(requestId:string, arbitratorMemberId:string) :Observable<BaseResponse<any>>{
    let obj = {
      requestId,
      arbitratorMemberId
    }
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.Arbitration.AddLitigationRequestArbitratorsMemberdecision, obj)
  }
}
