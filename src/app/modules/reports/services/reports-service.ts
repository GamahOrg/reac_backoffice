import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Pagination } from '@app/shared/models/pagination.model';
import { Observable } from 'rxjs';
import { GetLitigationStatisticsMainReportResult } from '../models/litigation-statistics-review/litigation-statistics-review.model';
import { ReportFilter } from '../models/report-filter-request/report-filter-request.model';

@Injectable()
export class ReportsService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationStatisticsMainReportResult(input : ReportFilter): Observable<BaseResponse<GetLitigationStatisticsMainReportResult[]>> {
    
    return this._httpClient.post<BaseResponse<GetLitigationStatisticsMainReportResult[]>>(Configuration.APIs.Reports.GetLitigationStatisticsMainReportResult, input)
  }
  GetLitigationStatisticsReformerReportResult(input : ReportFilter): Observable<BaseResponse<GetLitigationStatisticsMainReportResult[]>> {
    
    return this._httpClient.post<BaseResponse<GetLitigationStatisticsMainReportResult[]>>(Configuration.APIs.Reports.GetLitigationStatisticsReformerReport, input)
  }
  GetLitigationStatisticsArbitrationReport(input : ReportFilter): Observable<BaseResponse<GetLitigationStatisticsMainReportResult[]>> {
    
    return this._httpClient.post<BaseResponse<GetLitigationStatisticsMainReportResult[]>>(Configuration.APIs.Reports.GetLitigationStatisticsArbitrationReport, input)
  }
}
