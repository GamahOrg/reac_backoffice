import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { CitizenReformer } from '../models/citizen.model';

@Injectable()
export class CitizenService {

  constructor(private _httpClient: HttpClient) { }

  getReformersLookup(citizenId: string): Observable<BaseResponse<CitizenReformer[]>> {    
    let queryParams = new HttpParams();
    if(citizenId)
    queryParams = queryParams.append("citizenId", citizenId);
    return this._httpClient.get<BaseResponse<CitizenReformer[]>>(`${Configuration.APIs.Citizen.GetReformersLookup}`, { params: queryParams })
  }
}
