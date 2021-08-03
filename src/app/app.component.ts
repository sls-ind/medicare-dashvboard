import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements AfterViewInit {
  title = "Patient Dashboard";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterViewInit() {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer swVIBAwPb30.8ML-xIGyIbTB6X3Tr88QhN166cLa-T2VX-9mMukghog",
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http
      .get("https://webchat.botframework.com/api/tokens", requestOptions)
      .subscribe((resp) => {
        this.processResponse(resp);
      });
  }

  processResponse(resp) {
    debugger;
    //@ts-ignore
    document.getElementById("chat").src =
      "https://webchat.botframework.com/embed/iabhi-health-bot-cumx8kh?t=" +
      resp;
  }
}
