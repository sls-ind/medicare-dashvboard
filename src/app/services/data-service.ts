import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  apiURL: String = environment.apiURL;
  constructor(private httpClient: HttpClient) {}

  getPatientsList(): Observable<any> {
    const URL = this.apiURL + "api/v1/getUser";
    return this.httpClient.get(URL);
  }

  getPatientDetails(patientId): Observable<Object> {
    const URL = this.apiURL + "api/v1/getUser/" + patientId;
    return this.httpClient.get(URL);
  }
  getVitalsHistory(patientId): Observable<Object> {
    const URL = this.apiURL + "api/v1/getVitals/" + patientId;
    return this.httpClient.get(URL);
  }
}
