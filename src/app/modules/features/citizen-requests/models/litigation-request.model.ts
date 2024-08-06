export interface LitigationRequestMircoForRequestSessionDto  {
    id: string;
    requestCode: string | null;
    requestDate: string;
    firstPartyName: string;
    secondPartyName: string;
    requestTypeName: string;
    sessionDatetime: string;
    url: string | null;
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