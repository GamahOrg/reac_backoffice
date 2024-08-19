export interface LitigationRequestMircoArbitratorDto {
    id:string;
    litigationRequestArbitratorListId:string;
    arbitratoId:string;
    requestCode:string;
    requestDate:Date;
    firstPartyName:string;
    secondPartyName:string;
    requestTypeName:string;
    arbitratorAssigningRequestTypeId:ArbitratorAssigningRequestType;
    arbitratorName:string;
}
export enum ArbitratorAssigningRequestType
{
    Arbitrator = 1,
    ArbitratorsChairman = 2
}