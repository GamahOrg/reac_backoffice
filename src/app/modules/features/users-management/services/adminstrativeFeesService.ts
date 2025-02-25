import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { AdminstrativeFeesDto } from '../models/AdminstrativeFeesDto';

@Injectable()
export class AdminstrativeFeesService {

  constructor(private _httpClient: HttpClient) { }

  
  CreateFees(model: AdminstrativeFeesDto):Observable<BaseResponse<any>>{
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.adminstrativeFees.createFees}`,model)
  }
  getAllFees(): Observable<BaseResponse<AdminstrativeFeesDto[]>> {
    return this._httpClient.get<BaseResponse<AdminstrativeFeesDto[]>>(`${Configuration.APIs.adminstrativeFees.getAllFees}`)
  }
  GetFeesById(id:string): Observable<BaseResponse<AdminstrativeFeesDto>> {
    return this._httpClient.get<BaseResponse<AdminstrativeFeesDto>>(`${Configuration.APIs.adminstrativeFees.GetFeesById}`+"?id="+id)
  }
  
  UpdateFees(FeesUpdate:AdminstrativeFeesDto):Observable<BaseResponse<any>>{
    console.log(FeesUpdate);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.adminstrativeFees.updateFees+"?id="+FeesUpdate.id,FeesUpdate)
  }
  
}
