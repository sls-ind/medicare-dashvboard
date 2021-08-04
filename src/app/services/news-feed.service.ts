import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NewsFeedService {
  apiURL: string =
    "https://news.google.com/rss/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-IN&gl=IN&ceid=IN:en";

  userLatitude: number;
  userLongitude: number;

  constructor(private http: HttpClient) {}

  getNewsFeed() {
    return this.http.get(this.apiURL, { responseType: "text" });
  }
}
