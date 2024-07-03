import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { securityAPI } from '../../interceptors/base-URl-handler/base-url-handler.interceptor';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../../models/base-response';
import { TokenResponse } from '../../models/token-response.model';
import { Configuration } from '../../configurations/shared.config';

@Injectable()
export class RefreshTokenService {
  securityAPIContext: HttpContext = new HttpContext().set(securityAPI, true);
  constructor(private _httpClient: HttpClient) { }
  
  refreshToken(refreshToken: string): Observable<BaseResponse<TokenResponse | null>> {

    return this._httpClient.post<BaseResponse<TokenResponse| null>>(Configuration.APIs.Account.refreshToken,  {refreshToken}, { context: this.securityAPIContext }).pipe(
      map((res: BaseResponse<TokenResponse| null>) => {
          return res
      })
    )
  }
}
