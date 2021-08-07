import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  apiURL: String = environment.apiURL;
  userRole = null;
  userID = null;

  updateUserInfo = new Subject();
  onUserInfoUpdate$ = this.updateUserInfo.asObservable();

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
  getUserMedicalHistory(patientId): Observable<Object> {
    const URL = this.apiURL + "api/v1/getUserMedicalHistory/" + patientId;
    return this.httpClient.get(URL);
  }

  getUserType(email): Observable<any> {
    const URL = this.apiURL + "api/v1/searchUser/" + email;
    return this.httpClient.get(URL);
  }

  //common file upload service to handle patient and vitals entry
  uploadFile(urlEndpoint: string, file: File): Observable<HttpEvent<any>> {
    const url = this.apiURL + urlEndpoint;
    let formData = new FormData();
    formData.append("file", file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest("POST", url, formData, options);
    return this.httpClient.request(req);
  }
}
