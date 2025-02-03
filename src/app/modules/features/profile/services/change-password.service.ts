import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configuration } from "@app/core/configurations/shared.config";
import { BaseResponse } from "@app/core/models/base-response";
import { Observable } from "rxjs";
import { ChangePasswordDto } from "../models/change-password.model";

@Injectable()
export class ChangePasswordService {

  constructor(private _httpClient: HttpClient) { }

  
  changePassword(model:ChangePasswordDto):Observable<BaseResponse<any>>{
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.profile.changePassword,model)
  }

 
}