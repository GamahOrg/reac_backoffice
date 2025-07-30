import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination.model';
import { EmployeeDto, EmployeeStatusUpdate, targetEmployeeDto } from '../models/employeeDto';
import { DepartmentDto } from '../models/departmentDto';

@Injectable()
export class UsersManagementService {

  constructor(private _httpClient: HttpClient) { }

  
  CreateEmploee(model: targetEmployeeDto):Observable<BaseResponse<any>>{
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.usersManagement.CreateEmployee}`,model)
  }

  GetAllEmployee(pageIndex: number, pageSize: number,searchCriteria:any): Observable<BaseResponse<Pagination<EmployeeDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    
 
   if( searchCriteria.name!=''){
      queryParams = queryParams.append("searchKey", searchCriteria.name.trim())
    }
    else if( searchCriteria.mobile!=''){
      queryParams = queryParams.append("searchKey", searchCriteria.mobile.trim())
    }
    else if( searchCriteria.department!=''){
      queryParams = queryParams.append("searchKey", searchCriteria.department)
    } else if(searchCriteria.isActive!=''){
      queryParams = queryParams.append("isActive", searchCriteria.isActive);
    }
      
    return this._httpClient.get<BaseResponse<Pagination<EmployeeDto[]>>>(`${Configuration.APIs.usersManagement.getAllEmployee}`, { params: queryParams })
  }

  getAllDepartmentsLookup(): Observable<BaseResponse<DepartmentDto[]>> {
    return this._httpClient.get<BaseResponse<DepartmentDto[]>>(`${Configuration.APIs.usersManagement.getAllDepartmentsLookup}`)
  }

  UpdateEmployeeStatus(employeeStatusUpdate:EmployeeStatusUpdate):Observable<BaseResponse<any>>{
    console.log(employeeStatusUpdate);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.usersManagement.UpdateEmployeeStatus+"?employeeId="+employeeStatusUpdate.employeeId+"&isActive="+employeeStatusUpdate.isActive,employeeStatusUpdate)
  }

  UpdateEmployee(employeeStatusUpdate:targetEmployeeDto):Observable<BaseResponse<any>>{
    console.log(employeeStatusUpdate);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.usersManagement.updateEmployee,employeeStatusUpdate)
  }
  
  GetEmployeeById(id:string): Observable<BaseResponse<EmployeeDto>> {
    return this._httpClient.get<BaseResponse<EmployeeDto>>(`${Configuration.APIs.usersManagement.getEmployeeById}`+"?employeeId="+id)
  }
}
