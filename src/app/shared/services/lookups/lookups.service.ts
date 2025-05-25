import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { ArbitratorsLookupDto } from '@app/modules/features/arbitration/models/arbitrators-lookup-dto';
import { AreaResponse } from '@app/modules/features/citizen-requests/models/area-response.model';
import { CitizenReformer } from '@app/modules/features/citizen-requests/models/citizen.model';
import { CityResponse } from '@app/modules/features/citizen-requests/models/city-response.model';
import { EmployeeDto } from '@app/modules/features/users-management/models/employeeDto';
import { EmployeeLookupResponse } from '@app/shared/models/employee.lookup.model';
import { LitigationAmountResponse } from '@app/shared/models/litigation.Amount.model';
import { LitigationCategoryResponse } from '@app/shared/models/litigation.categories.model';
import { LitigationStatusResponse } from '@app/shared/models/litigation.status.model';
import { Pagination } from '@app/shared/models/pagination.model';
import { Observable } from 'rxjs';


@Injectable()
export class LookupsService {

  constructor(private _httpClient: HttpClient) { }

  SysCity(): Observable<BaseResponse<CityResponse[]>> {
    return this._httpClient.get<BaseResponse<CityResponse[]>>(Configuration.APIs.SysCity.Get)
  }

  GetSysArea(): Observable<BaseResponse<AreaResponse[]>> {
    return this._httpClient.get<BaseResponse<AreaResponse[]>>(Configuration.APIs.SysArea.Get)
  }
  GetSysCategories(): Observable<BaseResponse<LitigationCategoryResponse[]>> {
    return this._httpClient.get<BaseResponse<LitigationCategoryResponse[]>>(Configuration.APIs.SysCategories.GetLitigationRequestCategories)
  }
  SysLitigationRequestAmountList(): Observable<BaseResponse<LitigationAmountResponse[]>> {
    return this._httpClient.get<BaseResponse<LitigationAmountResponse[]>>(Configuration.APIs.SysLitigationRequestAmount.Get)
}
  GetSysLitigationStatus(): Observable<BaseResponse<LitigationStatusResponse[]>> {
    return this._httpClient.get<BaseResponse<LitigationStatusResponse[]>>(Configuration.APIs.SysStatuses.GetLitigationRequestStatus)
  }

  GetAllEmployeeByDepartmentType(departmentType: number): Observable<BaseResponse<EmployeeLookupResponse[]>> {
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append("departmentType", departmentType);

      return this._httpClient.get<BaseResponse<EmployeeLookupResponse[]>>(Configuration.APIs.usersManagement.getAllEmployeeByDepartmentTypeLookup, {params : queryParams})
    }

    getAllReformers(): Observable<BaseResponse<CitizenReformer[]>> {
        
      return this._httpClient.get<BaseResponse<CitizenReformer[]>>(Configuration.APIs.Citizen.GetReformersLookupForFilter)
    }
    getAllArbitrators(): Observable<BaseResponse<ArbitratorsLookupDto[]>> {
        
      return this._httpClient.get<BaseResponse<ArbitratorsLookupDto[]>>(Configuration.APIs.Citizen.GetArbitratorsLookupForFilter)
    }

}
