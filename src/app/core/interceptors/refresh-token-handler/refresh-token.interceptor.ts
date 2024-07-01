import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { StorageService } from '../../services/storage-service/storage.service';
import { LoaderService } from '../../services/loader/loader.service';
import { RefreshTokenService } from '../../services/refresh-token/refresh-token.service';
import { Configuration } from '../../configurations/shared.config';
import { ToastrNotificationService } from '../../services/toastr-notification/toastr-notification.service';
import { Router } from '@angular/router';

let refreshTokenInProgress = false;
let refreshTokenSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
// const _loaderService = inject(LoaderService);
// const _refreshTokenService = inject(RefreshTokenService);
// const _storageService = inject(StorageService);
// const _toastrNotificationService = inject(ToastrNotificationService);
// const _router = inject(Router);


export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _loaderService = inject(LoaderService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      _loaderService.showLoader.next(false);
      console.log('in return of error handler interceptor refresh', error);
      console.log('in return of error handler interceptor refresh', error.status);

      if (
        error.status === Configuration.httpResponseStatusCode.unauthorized ||
        error.status === Configuration.httpResponseStatusCode.forbidden ||
        error.status ===
        Configuration.httpResponseStatusCode.proxyAuthenticationRequired
      ) {
        return handleUnauthorized(req, next);
      }
      return throwError(() => error.statusText);
    })
  );
};

function handleUnauthorized(request: HttpRequest<any>, next:HttpHandlerFn) {
  const _refreshTokenService = inject(RefreshTokenService);
  const _loaderService = inject(LoaderService);
  const _storageService = inject(StorageService);
  if (!refreshTokenInProgress) {
    refreshTokenInProgress = true;
    refreshTokenSubject.next(null);

    const token = _storageService.getRefreshToken();
    _loaderService.showLoader.next(true);

    if (token) {
      return _refreshTokenService.refreshToken(token).pipe(
        switchMap((res: any) => {
          refreshTokenInProgress = false;
          if (res.data != null) {
            _storageService.saveTokens(res.data);

            refreshTokenSubject.next(res.data.accessToken);

            return next(addTokenHeader(request, res.data.accessToken));
          } else {
            return logout();
          }
        }),
        catchError((error) => {
          return logout();     
        })
      );
    }else{
      return logout();   
    }

  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap((token) => next(addTokenHeader(request, token as string)))
  );
}

function logout() {
  const _toastrNotificationService = inject(ToastrNotificationService);
  const _router = inject(Router);

  localStorage.clear();
  _toastrNotificationService.showError('Unauthorized');
  _router.navigate([Configuration.modules.auth]);
  return throwError(() => 'Unauthorized');
}

function addTokenHeader(request: HttpRequest<any>, accessToken: string) {
  const token = 'Bearer ' + accessToken;
  return request.clone({ headers: request.headers.set('Authorization', token) });
}


