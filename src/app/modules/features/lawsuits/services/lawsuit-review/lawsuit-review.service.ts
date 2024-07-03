import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LawsuitReiewRequestDto } from '../../models/lawsuit-reiew-request-dto';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { Configuration } from '@app/core/configurations/shared.config';
import { WorkFlowStepEventShortDtos } from '../../models/work-flow-step-event-short-dtos.model';
import { GetWorkflowStepEventsForEmployeeDto } from '../../models/get-workflow-step-events-for-employee-dto.model';

@Injectable()
export class LawsuitReviewService {

  constructor(private _httpClient: HttpClient) { }

  create(date: LawsuitReiewRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.BpfService.ProcessWorkFlow, date)
  }
  GetWorkflowStepEventsForEmployee(requestId: string, employeeId: string): Observable<BaseResponse<GetWorkflowStepEventsForEmployeeDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("requestId", requestId);
    queryParams = queryParams.append("employeeId", employeeId);
    return this._httpClient.get<BaseResponse<GetWorkflowStepEventsForEmployeeDto>>(Configuration.APIs.BpfService.GetWorkflowStepEventsForEmployee, { params: queryParams })
  }
}
