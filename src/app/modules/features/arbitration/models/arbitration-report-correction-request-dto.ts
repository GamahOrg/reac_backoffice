import { LitigationRequestShortDto } from '../models/arbitration-request.model';

export interface LitigationRequestForArbitrationReportCorrectionRequestDto {
    allowAdd: boolean;
    allowResponse: boolean;
    litigationRequestShortDto: LitigationRequestShortDto | null;
    correctionRequests: ArbitrationReportCorrectionRequestGetDto[] | null;
}

export interface ArbitrationReportCorrectionRequestGetDto {
    id: string;
    correctionDescription: string;
    requestDate: Date;
    approveRejectStatus?: number;
    rejectReason?: string;
    correctionDecisionText?: string;
    files: ArbitrationReportCorrectionRequestFileGetDto[];
}

export interface ArbitrationReportCorrectionRequestFileGetDto {
    id: string;
    correctionRequestFileId?: string;
    filePath: string;
}
