export interface GetArbitratorsCountResponseDto {
    requestCode: string,
    requestDate: Date,
    firstPartyName: string ,
    secondPartyName:string,
    requestTypeName: string,
    status: string,
    firstPartyArbitratorsCount: null|number,
    secondPartyArbitratorsCount: null|number,
    arbitratorsCount: null|number,
    isDone: string,
    isArbitrationFeesHaveBeenCollected?:boolean,
    id: string
}
