import { Component, OnInit } from '@angular/core';
import { SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-med-search',
  templateUrl: './med-search.component.html',
  styleUrls: ['./med-search.component.scss']
})
export class MedSearchComponent implements OnInit {

  value: string;
  data: any;
  patientDetails = [];
  searchInput: string = "";
  recognizing = false;
  private notification: string;
  innerHtml: string = "";
  private lastRecognized: string = "";
  _recognizer: SpeechRecognizer;
  constructor(private service:DataService
  ) {
    this.value = '';
   }

  ngOnInit(): void {
  }

  getData() : void {
    this.service.getPharmaData(this.searchInput).subscribe(resp => {
      this.data = resp;
      console.log(this.data);
    }, error => {
      console.error(error);
    })
  }
  startButton(event) {

  }
}
