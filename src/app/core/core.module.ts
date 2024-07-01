import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { StorageService } from './services/storage-service/storage.service';
import { authGuard } from './guards/auth-guard/auth.guard';
import { tokenGuard } from './guards/token-guard/token.guard';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseURlHandlerInterceptor } from './interceptors/base-URl-handler/base-url-handler.interceptor';
import { loaderHandlerInterceptor } from './interceptors/loader-handler/loader-handler.interceptor';
import { headersHandlerInterceptor } from './interceptors/headers-handler/headers-handler.interceptor';
import { ToastrNotificationService } from './services/toastr-notification/toastr-notification.service';
import { errorsHandlerInterceptor } from './interceptors/errors-handler/errors-handler.interceptor';
import { refreshTokenInterceptor } from './interceptors/refresh-token-handler/refresh-token.interceptor';
import { RefreshTokenService } from './services/refresh-token/refresh-token.service';
import { LoaderService } from './services/loader/loader.service';
import { LanguageService } from './services/language/language.service';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    // LoaderComponent
  ],
  providers:[
    LanguageService,
    StorageService,
    ToastrNotificationService,
    RefreshTokenService,
    LoaderService,
    provideHttpClient(
      withInterceptors([
      loaderHandlerInterceptor, 
      baseURlHandlerInterceptor, 
      headersHandlerInterceptor,
      errorsHandlerInterceptor,
      refreshTokenInterceptor
    ])),
  ],
  imports: [
    CommonModule,
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    // TranslateModule.forChild(),
  ],
  exports:[
    // LoaderComponent
  ]
})
export class CoreModule { }
