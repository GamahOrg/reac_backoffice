import { LitigationRequestShortDto } from "../../citizen-requests/models/litigation-request-for-extend-period-request-dto";

export interface GetArbitratorsCountByRequestIdResponseDto {
    allowAdd: boolean,
    arbitratorsCount: null | string,
    secondPartyArbitratorsCount: null | string,
    firstPartyArbitratorsCount: null | string,
    litigationRequestShortDto :LitigationRequestShortDto;
}

