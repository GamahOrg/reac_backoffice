export interface ArbitrationReportCorrectionRequestCreateDto {
    id: string;
    litigationRequestId: string;
    correctionDescription: string;
    fileIds: string[];
}
