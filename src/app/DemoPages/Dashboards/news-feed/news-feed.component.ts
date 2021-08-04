import { Component, OnInit } from "@angular/core";
import {
  ContentModel,
  DollerModel,
  EntryModel,
  FeedModel,
  LinkModel,
  RSSModel,
} from "./news-feed.modal";
import * as xml2js from "xml2js";
import { NewsFeedService } from "src/app/services/news-feed.service";

@Component({
  selector: "app-news-feed",
  templateUrl: "./news-feed.component.html",
  styleUrls: ["./news-feed.component.sass"],
})
export class NewsFeedComponent implements OnInit {
  newsRssData: RSSModel = new RSSModel();
  isFeedDataArrived = false;
  constructor(private rssService: NewsFeedService) {
    this.getNewsFeedData();
  }

  ngOnInit(): void {}

  getNewsFeedData() {
    this.rssService.getNewsFeed().subscribe((data) => {
      console.log("data : ");
      let parseString = xml2js.parseString;
      parseString(data, (err, result: RSSModel) => {
        this.newsRssData = result;
        this.isFeedDataArrived = true;
      });
    });
  }
}
