import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { ReformersDecisionsDto } from '../../models/reformers-decisions-dto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Configuration } from '@app/core/configurations/shared.config';
import { Pagination } from '@app/shared/models/pagination.model';
import { ArbitratorDecisionDetailsResponseDto } from '../../models/arbitrator-decision-details-response-dto.model';
import { AddFreeUpDecision } from '../../models/add-free-up-decision.model';
import { AddStopDecision } from '../../models/add-stop-decision.model';

@Injectable()
export class ArbitratorsDecisionsService {

  constructor(private _httpClient: HttpClient) { }

  GetArbitratorsDecisions(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<ReformersDecisionsDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<ReformersDecisionsDto[]>>>(Configuration.APIs.Citizen.GetArbitratorsDecisions, { params: queryParams })
  }

  GetArbitratorsDecisionsByCitizenId(citizenId: string): Observable<BaseResponse<ArbitratorDecisionDetailsResponseDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("citizenId", citizenId);
    return this._httpClient.get<BaseResponse<ArbitratorDecisionDetailsResponseDto>>(Configuration.APIs.Citizen.GetArbitratorsDecisionsByCitizenId, { params: queryParams })
  }

  AddArbitratorFreeUpDecision(addFreeUpDecision: AddFreeUpDecision): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.Citizen.AddArbitratorFreeUpDecision, addFreeUpDecision)
  }
  AddArbitratorStopDecision(addStopDecision: AddStopDecision): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.Citizen.AddArbitratorStopDecision, addStopDecision)
  }

}
