
export interface termsConditionsDto {
    id: string;
    typeName : string;
    acknowledgmentContent : string;
    termsAndConditions : string;
    translations: any[]
    }

    export interface termsConditionsUpdateDto {
        id: string;
        typeName : string;
        acknowledgmentContent : string;
        termsAndConditions : string;
        }