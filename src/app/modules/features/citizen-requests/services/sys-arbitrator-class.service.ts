import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '@app/core/configurations/shared.config';
import { SysArbitratorClassDto } from '../models/citizen-request.model';
import { BaseResponse } from '@app/core/models/base-response';

@Injectable()
export class SysArbitratorClassService {

    constructor(private _httpClient: HttpClient) { }

    getArbitratorClasses(experienceYears: number): Observable<BaseResponse<SysArbitratorClassDto[]>> {
        return this._httpClient.get<BaseResponse<SysArbitratorClassDto[]>>(`${Configuration.APIs.ArbitratorClass.GetArbitratorClasses}?experienceYears=${experienceYears}`)
    }

    getArbitratorClass(experienceYears: number): Observable<BaseResponse<SysArbitratorClassDto>> {
        return this._httpClient.get<BaseResponse<SysArbitratorClassDto>>(`${Configuration.APIs.ArbitratorClass.GetArbitratorClass}?experienceYears=${experienceYears}`)
    }

}
