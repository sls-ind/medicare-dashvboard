import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chat-bot",
  templateUrl: "./chat-bot.component.html",
  styleUrls: ["./chat-bot.component.sass"],
})
export class ChatBotComponent implements OnInit {
  chatBotResp;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

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
        this.chatBotResp = resp;
        this.processResponse();
      });
  }

  processResponse() {
    //@ts-ignore
    document.getElementById("chat").src =
      "https://webchat.botframework.com/embed/iabhi-health-bot-cumx8kh?t=" +
      this.chatBotResp;
  }
}
