export class RSSModel {
  feed: FeedModel = new FeedModel();
}
export class FeedModel {
  title: string;
  icon: string;
  link: string;
  entry: EntryModel = new EntryModel();
}
export class EntryModel {
  title: string;
  content: ContentModel[] = new Array();
  link: LinkModel[] = new Array();
}
export class ContentModel {
  _: any;
}
export class LinkModel {
  $: DollerModel[] = new Array();
}
export class DollerModel {
  href: string;
}
