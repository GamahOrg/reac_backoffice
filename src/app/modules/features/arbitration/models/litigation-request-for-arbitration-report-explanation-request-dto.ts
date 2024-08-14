import { LitigationRequestShortDto } from "../../citizen-requests/models/litigation-request-for-extend-period-request-dto";
import { LitigationRequestArbitrationReportExplanationRequestGetDto } from "./litigation-request-arbitration-report-explanation-request-get-dto";

export interface LitigationRequestForArbitrationReportExplanationRequestDto {
    allowAdd:boolean;
    litigationRequestShortDto:LitigationRequestShortDto
    report :LitigationRequestArbitrationReportExplanationRequestGetDto;
}
