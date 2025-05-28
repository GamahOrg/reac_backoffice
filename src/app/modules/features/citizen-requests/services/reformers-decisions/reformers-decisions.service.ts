import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Configuration } from '@app/core/configurations/shared.config';
import { Pagination } from '@app/shared/models/pagination.model';
import { ReformersDecisionsDto } from '../../models/reformers-decisions-dto.model';
import { ReformerDecisionDetailsResponseDto } from '../../models/reformer-decision-details-response-dto.model';
import { AddFreeUpDecision } from '../../models/add-free-up-decision.model';
import { AddStopDecision } from '../../models/add-stop-decision.model';

@Injectable()
export class ReformersDecisionsService {

  constructor(private _httpClient: HttpClient) { }

  GetReformersDecisions(pageIndex: number, pageSize: number,searchCriteria :any): Observable<BaseResponse<Pagination<ReformersDecisionsDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);

    if( searchCriteria.fullName!=''){
      queryParams = queryParams.append("searchKey", searchCriteria.fullName.trim())
    }
    else if( searchCriteria.identityNumber!=''){
      queryParams = queryParams.append("searchKey", searchCriteria.identityNumber.trim())
    }
    else if(searchCriteria.isActive != ''){
      queryParams = queryParams.append("isActive", searchCriteria.isActive);
    }
    
    return this._httpClient.get<BaseResponse<Pagination<ReformersDecisionsDto[]>>>(Configuration.APIs.Citizen.GetReformersDecisions, { params: queryParams })
  }

  GetReformersDecisionsByCitizenId(citizenId: string): Observable<BaseResponse<ReformerDecisionDetailsResponseDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("citizenId", citizenId);
    return this._httpClient.get<BaseResponse<ReformerDecisionDetailsResponseDto>>(Configuration.APIs.Citizen.GetReformersDecisionsByCitizenId, { params: queryParams })
  }

  AddReformerFreeUpDecision(addFreeUpDecision: AddFreeUpDecision): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.Citizen.AddReformerFreeUpDecision, addFreeUpDecision)
  }
  AddReformerStopDecision(addStopDecision: AddStopDecision): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.Citizen.AddReformerStopDecision, addStopDecision)
  }


}
