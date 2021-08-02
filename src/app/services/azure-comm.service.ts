import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AzureCommService {
  apiURL: String = environment.apiURL;

  userLatitude: number;
  userLongitude: number;

  constructor(private httpClient: HttpClient) {
    this.test();
  }

  getPharmaData(searchTxt) {
    //Request URL: https://www.medplusmart.com/ProductSearchAll.mart?n=cDY1MA==&productType=A

    const URL = this.apiURL + "api/v1/getProducts/" + btoa(searchTxt);

    return this.httpClient.get(URL);
  }

  test() {
    const URL = this.apiURL + "hello";

    this.httpClient.get(URL).subscribe(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
