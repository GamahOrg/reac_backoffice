export interface LitigationRequestMircoForRequestSessionDto  {
    id: string;
    requestCode: string | null;
    requestDate: string;
    firstPartyName: string;
    secondPartyName: string;
    requestTypeName: string;
    sessionDatetime: string;
    url: string | null;
    meetingId: number | null;
}

export interface LitigationRequestSessionDetailsDto {
    id: string;
    source: string;
    start_time: string;
    total_minutes: number;
    end_time: string;
    duration: number;
    participants_count: number;
    participants: Participants[];

}

export interface Participants{
    id: string;
    name: string;
    total_minutes: number;
    join_time: string;
    leave_time: string;

}

export interface LitigationRequestMircoForRequestReformerDto{
    id: string;
    requestCode: string | null;
    requestDate: string;
    firstPartyName: string;
    secondPartyName: string;
    requestTypeName: string;
    reformerName: string | null;
    reformerId: string;
}