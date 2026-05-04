export interface ArbitrationCorrectionRequestResponseDto {
    id: string;
    litigationRequestId: string;
    response: number;
    rejectReason?: string;
    correctionDecisionText?: string;
}
