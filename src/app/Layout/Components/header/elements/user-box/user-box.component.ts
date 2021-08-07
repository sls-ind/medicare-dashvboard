import { Component, HostBinding, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { ThemeOptions } from "../../../../../theme-options";
import { Subject, Observable } from "rxjs";
import { select } from "@angular-redux/store";
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from "@azure/msal-angular";
import {
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
} from "@azure/msal-browser";
import { filter, takeUntil } from "rxjs/operators";
import { DataService } from "src/app/services/data-service";

interface Payload extends AuthenticationResult {
  idTokenClaims: {
    tfp?: string;
  };
}
@Component({
  selector: "app-user-box",
  templateUrl: "./user-box.component.html",
})
export class UserBoxComponent implements OnInit {
  loggedIn: boolean;
  faEllipsisV = faEllipsisV;
  isActive: boolean;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  geoLocation: string;
  userWeather: any;
  userName: string;

  @HostBinding("class.isActive")
  get isActiveAsGetter() {
    return this.isActive;
  }

  @select("config") public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

  constructor(
    public router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    public globals: ThemeOptions,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.setLoginDisplay();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    console.log("this.loginDisplay", this.loginDisplay)
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();
    this.userName = activeAccount ? activeAccount.name : null;

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.getUserType("");
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.getUserType("");
        });
    }
  }

  getUserType(email) {
    // this.dataService.getUserType(email).subscribe((resp) => {
    //   this.dataService.userRole = "";
    // });
    if (this.userName === "Nilesh") {
      this.dataService.userRole = "Admin";
    } else {
      this.dataService.userID = 60;
    }
    this.dataService.updateUserInfo.next();
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/",
      });
    } else {
      this.authService.logoutRedirect();
    }
  }
}
