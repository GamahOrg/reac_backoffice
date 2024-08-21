/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from '@environment/environment';
import { enableProdMode } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  let env = environment.production
  if (env) { // assuming you have env variable configured
    // check if window exists, if you render backend window will not be available 
    if (window) {
      enableProdMode();
      window.console.log = function () { };
      window.console.warn = function () { };
      window.console.error = function () { };
      window.console.info = function () { };
    
    }
  } 