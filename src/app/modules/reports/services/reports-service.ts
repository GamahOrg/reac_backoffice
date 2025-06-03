import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Pagination } from '@app/shared/models/pagination.model';
import { Observable } from 'rxjs';
import { GetLitigationStatisticsMainReportResult } from '../models/litigation-statistics-review/litigation-statistics-review.model';
import { ReportFilter } from '../models/report-filter-request/report-filter-request.model';
import { DashbourdRequestDto } from '../models/litigation-dashbourd-review/DashbourdRequestDto';
import { ListReviewReportModel } from '../models/list-review-report/list-review-report.model';
import { ListReformerReportModel } from '../models/list-reformer-report/list-reformer-report.model';
import { ListArbitratorReportModel } from '../models/list-arbitrator-report/list-arbitrator-report.model';
import { ListAdminReportModel } from '@app/modules/features/users-management/models/ListAdminReportModel';
import { ListReviewersReportResult } from '../models/reviewers-report/ListReviwersreport';
import { ListReformersReportResult } from '../models/Reformers-Report/reformers-report';
import { ListArbitratorsReportResult } from '../models/arbitrators-report/arbitrators-report';

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

  getAllLitigationArbitirationsStatistics(requestDto:DashbourdRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetLitigationStatisticsArbitrationReports}`,requestDto)
  }
  getAllLitigationReformerStatistics(requestDto:DashbourdRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetLitigationStatisticsReformerReports}`,requestDto)
  }

  getAllLitigationReviewStatistics(requestDto:any): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetLitigationStatisticsReviewReports}`,requestDto)
  }

  getListOfLitigationReviewReport(requestDto:any): Observable<BaseResponse<Pagination<ListReviewReportModel[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListReviewReportModel[]>>>(`${Configuration.APIs.dashbourd.GetListOfLitigationReviewReport}`,requestDto)
  }
  getListOfLitigationReformerReport(requestDto:any): Observable<BaseResponse<Pagination<ListReformerReportModel[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListReformerReportModel[]>>>(`${Configuration.APIs.dashbourd.GetListOfLitigationReformerReport}`,requestDto)
  }

  getListOfLitigationArbitrationReport(requestDto:any): Observable<BaseResponse<Pagination<ListArbitratorReportModel[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListArbitratorReportModel[]>>>(`${Configuration.APIs.dashbourd.GetListOfLitigationArbitrationReport}`,requestDto)
  }
  getListOfLitigationForAdminReport(requestDto:any): Observable<BaseResponse<Pagination<ListAdminReportModel[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListAdminReportModel[]>>>(`${Configuration.APIs.dashbourd.GetListOfLitigationForAdminReport}`,requestDto)
  }
  getLitigationStatisticsForAdminReport(requestDto:any): Observable<BaseResponse<Pagination<any[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<any[]>>>(`${Configuration.APIs.dashbourd.GetLitigationStatisticsForAdminReport}`,requestDto)
  }
  getListOfReviewersReport(requestDto:any): Observable<BaseResponse<Pagination<ListReviewersReportResult[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListReviewersReportResult[]>>>(`${Configuration.APIs.dashbourd.GetReviewersReport}`,requestDto)
  }
  getListOfReformersReport(requestDto:any): Observable<BaseResponse<Pagination<ListReformersReportResult[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListReformersReportResult[]>>>(`${Configuration.APIs.dashbourd.GetReformersReport}`,requestDto)
  }
  getListOfArbitratorsReport(requestDto:any): Observable<BaseResponse<Pagination<ListArbitratorsReportResult[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListArbitratorsReportResult[]>>>(`${Configuration.APIs.dashbourd.GetArbitratorsReport}`,requestDto)
  }

  getReviewDashbourdStatistics(requestDto:any): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetReviewDashbourdReport}`,requestDto)
  }

  getReformerDashbourdStatistics(requestDto:any): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetReconciliationDashbourdReport}`,requestDto)
  }

  getArbitratorDashbourdStatistics(requestDto:any): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetArbitrationDashbourdReport}`,requestDto)
  }

  getAllPersonasReport(requestDto:any): Observable<BaseResponse<Pagination<ListArbitratorsReportResult[]>>> {
    return this._httpClient.post<BaseResponse<Pagination<ListArbitratorsReportResult[]>>>(`${Configuration.APIs.dashbourd.GetAllPersonasReport}`,requestDto)
  }
}
