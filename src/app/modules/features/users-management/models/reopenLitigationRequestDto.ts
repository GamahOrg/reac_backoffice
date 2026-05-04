export interface LitigationRequestClosedListDto {
  litigationRequestId: string;
  requestCode: string;
  requestTypeName: string;
  internalStatusName: string;
  submissionDate: string;
  cancellationDate: string;
  applicantName: string;
}

export interface LitigationRequestReopenInfoDto {
  litigationRequestId: string;
  requestCode: string;
  requestTypeName: string;
  administrativeFeesPaymentStatus: string;
  reconciliationFeesPaymentStatus: string;
  arbitrationFeesPaymentStatus: string;
  submissionDate: string;
  cancellationDate: string;
  statusBeforeCancellation: string;
  statusAfterReopen: string;
  reopenDate: string;
  reopenReason: string;
  allowReopen: boolean;
}

export interface ReopenLitigationRequestDto {
  litigationRequestId: string;
  reopenReason: string;
}
