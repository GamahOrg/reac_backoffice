export enum CitizenRequestType {
    Reformer = 1,
    Arbitrator = 2
}

export enum CitizenRequestAction {
    Send = 1,
    CertifiedWithOutFees = 2,
    CertifiedWithFees = 3,
    Reject = 4,
    SendForEdit = 5,
    SendFromEdit = 6,
    SendToPayFees = 7,
    FeesPaid = 8,
    SendToPayEditFees = 10,
    EditFeesPaid = 11,
}

export enum CitizenRequestActionButton {
    Send = "1",
    CertifiedWithOutFees = "2",
    CertifiedWithFees = "3",
    Reject = "4",
    SendForEdit = "5",
    SendFromEdit = "6"
}