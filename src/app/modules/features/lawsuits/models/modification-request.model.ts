
export interface ModificationListItem {
    id:string,
    litigationRequestId: string,
    requestCode: string,
    createdOn: Date,
    isApproved?: boolean,
    actorType: number,
    citizen: any,
    modificationRequest:string
}

export interface  ModificationRequesteStatusUpdate{
    modificationRequestId :string,
    isApproved :boolean,
}

