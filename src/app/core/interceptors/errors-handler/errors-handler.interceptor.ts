import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { BaseResponse } from '../../models/base-response';
import { inject } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { Configuration } from '../../configurations/shared.config';
import { ToastrNotificationService } from '../../services/toastr-notification/toastr-notification.service';


export const errorsHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const _loaderService = inject(LoaderService);
  const _toastrNotificationService = inject(ToastrNotificationService);

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        let responseBody = event.body as BaseResponse<any>;
        if (!req.url.includes('i18n')) {
          if (responseBody && !responseBody.isDone) {
            _toastrNotificationService.showError(responseBody.message);
            _loaderService.showLoader.next(false);
          }
        }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      _loaderService.showLoader.next(false);
      console.log('in return of error handler interceptor', req.url);
      console.log('in return of error handler interceptor', error);
      console.log('in return of error handler interceptor', error?.status);

      if (
        error.status === Configuration.httpResponseStatusCode.badRequest ||
        error.status === Configuration.httpResponseStatusCode.paymentRequiredExperimental ||
        error.status === Configuration.httpResponseStatusCode.notFound ||
        error.status === Configuration.httpResponseStatusCode.methodNotAllowed ||
        error.status === Configuration.httpResponseStatusCode.notAcceptable ||
        error.status === Configuration.httpResponseStatusCode.requestTimeout ||
        error.status === Configuration.httpResponseStatusCode.conflict ||
        error.status === Configuration.httpResponseStatusCode.gone ||
        error.status === Configuration.httpResponseStatusCode.lengthRequired
      ) {
        let responseBody = error.error as BaseResponse<any>;
        if (!req.url.includes('i18n')) {
          if (responseBody) {
            if (!responseBody.isDone) {
              _toastrNotificationService.showError(responseBody.message ? responseBody.message : error.statusText);
              _loaderService.showLoader.next(false);
            }
          } else {
            _toastrNotificationService.showError(error.statusText);
            return throwError(() => error.statusText);
          }

        }
      }

      // if (
      //   error.status === Configuration.httpResponseStatusCode.unauthorized ||
      //   error.status === Configuration.httpResponseStatusCode.forbidden ||
      //   error.status ===
      //   Configuration.httpResponseStatusCode.proxyAuthenticationRequired
      // ) {
      //   localStorage.clear();
      //   this._toastrNotificatioService.showError(error.statusText);
      //   this.router.navigate([Configuration.modules.auth]);
      //   return throwError(() => error.statusText);
      // }

      if (
        error.status ===
        Configuration.httpResponseStatusCode.internalServerError ||
        error.status ===
        Configuration.httpResponseStatusCode.notImplemented ||
        error.status === Configuration.httpResponseStatusCode.badGateway ||
        error.status ===
        Configuration.httpResponseStatusCode.serviceUnavailable ||
        error.status ===
        Configuration.httpResponseStatusCode.gatewayTimeout ||
        error.status ===
        Configuration.httpResponseStatusCode.hTTPVersionNotSupported ||
        error.status ===
        Configuration.httpResponseStatusCode.variantAlsoNegotiates ||
        error.status ===
        Configuration.httpResponseStatusCode.insufficientStorage ||
        error.status === Configuration.httpResponseStatusCode.loopDetected ||
        error.status === Configuration.httpResponseStatusCode.notExtended ||
        error.status ===
        Configuration.httpResponseStatusCode.networkAuthenticationRequired ||
        error.status === Configuration.httpResponseStatusCode.unknownError
      ) {
        _toastrNotificationService.showError(error.statusText);
        return throwError(() => error.statusText);
      }


      return throwError(() => error.statusText);
    })
  );
};
