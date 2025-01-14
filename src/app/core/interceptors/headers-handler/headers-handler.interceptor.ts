import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';

export const fileUploader = new HttpContextToken(() => false);


export const headersHandlerInterceptor: HttpInterceptorFn = (req, next) => {
      // add authorization to request header
      if (localStorage.getItem('token') !== null) {
        const token = 'Bearer ' + localStorage.getItem('token');
        if (token) {
          req = req.clone({
            headers: req.headers.set('Authorization', `${token}`),
          });
        }
      }
  
      // this.changeLanguageService.getSelectedLang().subscribe((data) => {
      req = req.clone({
        // headers: req.headers.set('Accept-Language', 'ar-EG'),
        headers: req.headers.set('culture', 'ar-SA'),
      });
  
      if (req.context.get(fileUploader) === true) {
        // console.log("req.context.get(fileUploader) === true");
        req = req.clone({
          reportProgress: true,
          responseType: 'json',
        });
        return next(req);
      } else {
        // console.log("req.context.get(fileUploader) else");
        // add content type to request header
        if (!req.headers.has('Content-Type')) {
          req = req.clone({
            headers: req.headers.set('Content-Type', 'application/json'),
          });
        }
        return next(req);
      }
};
