import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse, EmptyBaseResponse, PagedResultBase } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { CitizenRequestActionModel, CitizenRequestCreateUpdateDto, CitizenRequestFullDataDto, CitizenRequestShortDataDto } from '../models/citizen-request.model';
import { CitizenRequestAction, CitizenRequestType } from '../models/enums/citizen-request-type.model';

@Injectable()
export class CitizenRequestService {

    constructor(private _httpClient: HttpClient) { }

    GetCitizenRequestsForEmployee(pageIndex: number, pageSize: number,citizenRequestType:CitizenRequestType): Observable<BaseResponse<PagedResultBase<CitizenRequestShortDataDto>>> {
        return this._httpClient.get<BaseResponse<PagedResultBase<CitizenRequestShortDataDto>>>(`${Configuration.APIs.citizenRequests.GetCitizenRequestsForEmployee}?pageIndex=${pageIndex}&pageSize=${pageSize}&citizenRequestType=${citizenRequestType}`)
    }

    getCitizenRequestById(requestId: string): Observable<BaseResponse<CitizenRequestFullDataDto>> {
        return this._httpClient.get<BaseResponse<CitizenRequestFullDataDto>>(`${Configuration.APIs.citizenRequests.GetCitizenRequestById}?requestById=${requestId}`)
    }

    saveCitizenRequest(model: CitizenRequestCreateUpdateDto): Observable<EmptyBaseResponse> {
        return this._httpClient.post<EmptyBaseResponse>(`${Configuration.APIs.citizenRequests.SaveCitizenRequest}`, model)
    }

    executeAction( model:CitizenRequestActionModel): Observable<EmptyBaseResponse> {
        return this._httpClient.post<EmptyBaseResponse>(`${Configuration.APIs.citizenRequests.ExecuteAction}`,model)
    }

    
}
