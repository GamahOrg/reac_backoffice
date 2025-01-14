import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { finalize } from 'rxjs';

export const loaderHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const _loaderService = inject(LoaderService);
  let counter = 0 as number;
  counter++;
  _loaderService.showLoader.next(true);
  return next(req).pipe(
    finalize(()=> {
      counter--
      // console.log("this.counter finalize", this.counter);
      if (counter == 0) {
        setTimeout(() => {
          _loaderService.showLoader.next(false);
        }, 500);
      }
    }),
  );
};
