import { Component, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends BaseComponent {
  /**
   * logout
   :void*/
  private _router = inject(Router);
  public logout(): void {
    localStorage.clear();
    this._router.navigate([Configuration.modules.auth]);
  }
}
