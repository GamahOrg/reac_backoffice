import { DepartmentType } from "./enums/department-type.model";

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    isLawyer: boolean;
    isReformer: boolean;
    isArbitrator: boolean;
    isAdmin: boolean;
    departmentType:DepartmentType
}
