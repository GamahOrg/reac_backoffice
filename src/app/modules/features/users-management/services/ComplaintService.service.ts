import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  ApiResponse, 
  PagedResult, 
  ComplainDto, 
  CreateComplainDto, 
  UpdateComplainResponseDto, 
  ComplainSearchDto,
  ComplainReportDto,
  ComplaintTypes,
  ComplaintStatusesUser,
  ComplaintStatusesStaff
} from '../models/ComplainDto';
import { BaseResponse } from '@app/core/models/base-response';

@Injectable()
export class ComplaintService {
  private readonly apiUrl = '/api/complaints'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}

  /**
   * Create a new complaint/inquiry
   */
  createComplaint(createDto: CreateComplainDto): Observable<BaseResponse<ComplainDto>> {
    console.log('Creating complaint with data:', createDto);
    return this.http.post<BaseResponse<ComplainDto>>(`${this.apiUrl +'/CreateComplaint'}`, createDto);
  }

  /**
   * Get complaints with search/filter options
   */
  getComplaints(searchDto?: ComplainSearchDto): Observable<ApiResponse<PagedResult<ComplainDto>>> {
    let params = new HttpParams();

    if (searchDto) {
      if (searchDto.ticketNumber) params = params.set('ticketNumber', searchDto.ticketNumber);
    
        if (searchDto.fromDate) {
          const fromDate = new Date(searchDto.fromDate);
          params = params.set('fromDate', fromDate.toISOString());
        }
        if (searchDto.toDate) {
          const toDate = new Date(searchDto.toDate);
          params = params.set('toDate', toDate.toISOString());
        }
      if (searchDto.complainsTypeId !== undefined) params = params.set('complainsTypeId', searchDto.complainsTypeId.toString());
      if (searchDto.statusIds && searchDto.statusIds.length > 0) {
        searchDto.statusIds.forEach(id => params = params.append('statusIds', id.toString()));
      }
      if (searchDto.pageNumber !== undefined) params = params.set('pageNumber', searchDto.pageNumber.toString());
      if (searchDto.pageSize !== undefined) params = params.set('pageSize', searchDto.pageSize.toString());
      if (searchDto.isStaff !== undefined) params = params.set('isStaff', searchDto.isStaff.toString());
    }

    return this.http.get<ApiResponse<PagedResult<ComplainDto>>>(`${this.apiUrl + '/GetComplaints'}`, { params });
  }

  getComplaintById(id: number,isStaff:boolean): Observable<ApiResponse<ComplainDto>> {
    return this.http.get<ApiResponse<ComplainDto>>(`${this.apiUrl}/${id}?isStaff=${isStaff}`);
  }


  updateComplaintResponse(id: number, updateDto: UpdateComplainResponseDto): Observable<ApiResponse<ComplainDto>> {
    return this.http.put<ApiResponse<ComplainDto>>(`${this.apiUrl}/${id}/response`, updateDto);
  }


  closeComplaint(id: number): Observable<ApiResponse<ComplainDto>> {
    return this.http.put<ApiResponse<ComplainDto>>(`${this.apiUrl}/${id}/close`, {});
  }

  getComplaintTypes(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/types`);
  }


  getComplaintStatuses(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/statuses`);
  }

  generateComplaintReport(reportDto: ComplainReportDto): Observable<Blob> {
    let params = new HttpParams();
    
    if (reportDto.complainsTypeId !== undefined) params = params.set('complainsTypeId', reportDto.complainsTypeId.toString());
    if (reportDto.fromDate) params = params.set('fromDate', reportDto.fromDate.toISOString());
    if (reportDto.toDate) params = params.set('toDate', reportDto.toDate.toISOString());
    if (reportDto.statusIds && reportDto.statusIds.length > 0) {
      reportDto.statusIds.forEach(id => params = params.append('statusIds', id.toString()));
    }
    if (reportDto.overdueOnly) params = params.set('overdueOnly', reportDto.overdueOnly.toString());

    return this.http.get(`${this.apiUrl}/report`, { 
      params,
      responseType: 'blob'
    });
  }

  getLocalComplaintTypes() {
    return ComplaintTypes;
  }

  getLocalComplaintStatuses(isStaff: boolean = false) {
    return isStaff ? ComplaintStatusesStaff : ComplaintStatusesUser;
  }
}