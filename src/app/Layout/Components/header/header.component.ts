import { Component, HostBinding, Inject, OnInit } from "@angular/core";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { ThemeOptions } from "../../../theme-options";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AzureCommService } from "src/app/services/azure-comm.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  faEllipsisV = faEllipsisV;
  isActive: boolean;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  geoLocation: string;
  userWeather: any;
  userName: string;
  weatherIcon = "pe-7s-sun";

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
    private httpClient: HttpClient,
    private service: AzureCommService,
    public globals: ThemeOptions
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

    this.getUsersGeoLocation();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  getUserWeather(latitude: number, longitude: number) {
    console.log(latitude, longitude);
    this.geoLocation = latitude + "," + longitude;
    const URL = "https://atlas.microsoft.com/weather/currentConditions/json";
    let params: HttpParams = new HttpParams()
      .set("api-version", "1.0")
      .set("query", this.geoLocation)
      .set("subscription-key", "O1lkjKGwhSfs2gaGFsNVW1JmLa159O1OgYOa0iyDKC8");

    this.httpClient.get(URL, { params: params }).subscribe((resp) => {
      console.log(resp);
      const phrase = resp["results"][0].phrase;
      if (phrase && phrase.includes("Cloud")) {
        this.weatherIcon = "pe-7s-cloud";
      } else if (
        (phrase && phrase.includes("Rain")) ||
        phrase.includes("Shower") ||
        phrase.includes("Precep")
      ) {
        this.weatherIcon = "pe-7s-umbrella";
      } else if (
        (phrase && phrase.includes("air")) ||
        phrase.includes("Air") ||
        phrase.includes("Wind")
      ) {
        this.weatherIcon = "pe-7s-paper-plane";
      }
      this.userWeather =
        // resp["results"][0].phrase +
        // " " +
        resp["results"][0].temperature.value + "⁰" +
        resp["results"][0].temperature.unit;
    });
  }

  getUsersGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.service.userLatitude = latitude;
        this.service.userLongitude = longitude;

        this.getUserWeather(latitude, longitude);
      });
    } else {
      console.log("No support for geoloaction");
    }
  }
}
