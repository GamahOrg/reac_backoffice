import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

export const securityAPI = new HttpContextToken(() => false);

export const baseURlHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const BaseURL: string = environment.baseURL;
  const securityURl: string = environment.securityURl;

  if(req.url){
    if (!req.url.includes('i18n')) {
      if (req.context.get(securityAPI) === true) {
        req = req.clone({
          url: securityURl + req.url,
        });
      }else{
        req = req.clone({
          url: BaseURL + req.url,
        });
      }
    }
  }
  return next(req);
};

