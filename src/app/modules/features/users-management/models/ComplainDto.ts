export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors: string[];
  }
  
  export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }
  
  export interface ComplainDto {
    id: number;
    ticketNumber: string;
    createdDate: Date;
    createdTime: string;
    ticketDescription: string;
    applicantCitizenId: string;
    customerName: string;
    customerNID: string;
    mobileNo: string;
    email: string;
    responseText?: string;
    responseDate?: Date;
    closedDate?: Date;
    complainsStatusId: number;
    statusName: string;
    complainsTypeId: number;
    typeName: string;
    attachments: ComplainFileDto[];
  }
  
  export interface ComplainFileDto {
    id: string;
    fileManagerId: string;
    fileName: string;
    fileUrl: string;
  }
  
  export interface CreateComplainDto {
    ticketDescription: string;
    complainsTypeId: number;
    customerName: string;
    customerNID: string;
    mobileNo: string;
    email: string;
    attachments?: string[];
  }
  
  export interface UpdateComplainResponseDto {
    responseText: string;
  }
  
  export interface ComplainSearchDto {
    ticketNumber?: string;
    fromDate?: Date;
    toDate?: Date;
    complainsTypeId?: number;
    statusIds?: number[];
    pageNumber?: number;
    pageSize?: number;
    isStaff?: boolean;
  }
  
  export interface ComplainReportDto {
    complainsTypeId?: number;
    fromDate?: Date;
    toDate?: Date;
    statusIds?: number[];
    overdueOnly?: boolean;
  }
  
  // Define the complaint types and statuses based on the requirements document
  export const ComplaintTypes = [
    { id: 1, name: 'شكوى' },
    { id: 2, name: 'استفسار' },
    { id: 3, name: 'اقتراح' }
  ];
  
  // Status mappings based on the requirements - different views for users vs staff
  export const ComplaintStatusesUser = [
    { id: 1, name: 'تحت الدراسة' },
    { id: 2, name: 'تم الرد' },
    { id: 3, name: 'تم إغلاقها' }
  ];
  
  export const ComplaintStatusesStaff = [
    { id: 1, name: 'جديدة' },
    { id: 2, name: 'تم الرد من المركز' },
    { id: 3, name: 'تم إغلاقها' }
  ];
  
  export const getStatusBadgeClass = (statusId: number): string => {
    switch (statusId) {
      case 1: return 'badge bg-warning'; // New/Under Review
      case 2: return 'badge bg-success'; // Replied
      case 3: return 'badge bg-secondary'; // Closed
      default: return 'badge bg-secondary';
    }
  };
  
  export const getComplaintTypeName = (typeId: number): string => {
    const type = ComplaintTypes.find(t => t.id === typeId);
    return type ? type.name : 'غير محدد';
  };
  
  export const getComplaintStatusName = (statusId: number, isStaff: boolean = false): string => {
    const statuses = isStaff ? ComplaintStatusesStaff : ComplaintStatusesUser;
    const status = statuses.find(s => s.id === statusId);
    return status ? status.name : 'غير محدد';
  };