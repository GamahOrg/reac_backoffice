import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { securityAPI } from '@app/core/interceptors/base-URl-handler/base-url-handler.interceptor';
import { LoginParams } from '../../models/login.model';
import { Observable } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { TokenResponse } from '@app/core/models/token-response.model';
import { Configuration } from '@app/core/configurations/shared.config';

@Injectable()
export class LoginService {
  securityAPIContext: HttpContext = new HttpContext().set(securityAPI, true);

  constructor(private _httpClient: HttpClient) { }
  
  login(loginObj: LoginParams): Observable<BaseResponse<TokenResponse>> {
    return this._httpClient.post<BaseResponse<TokenResponse>>(Configuration.APIs.Account.login, loginObj, { context: this.securityAPIContext })
  }
}
