import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data-service";
import {
  AudioConfig,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";

@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.sass"],
})
export class PatientsListComponent implements OnInit {
  patientDetails = [];
  searchInput: string = "";
  recognizing = false;
  private notification: string;
  innerHtml: string = "";
  private lastRecognized: string = "";
  _recognizer: SpeechRecognizer;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.getPatientDetails();
  }

  getPatientDetails() {
    this.dataService.getPatientsList().subscribe(
      (data) => {
        this.patientDetails = data;
      },
      (error) => alert("Failed to fetch patient's list.")
    );
  }
  searchPatients() {
    this.dataService.getUserType(this.searchInput).subscribe(
      (data) => {
        this.patientDetails = data;
      },
      (error) => alert("Failed to fetch patient's list.")
    );
  }
  submitSearch() {
    if (this.searchInput && this.searchInput.trim() !== "") {
      this.searchPatients();
    }
  }

  startButton(event) {
    if (this.recognizing) {
      this.stop();
      this.recognizing = false;
    } else {
      this.lastRecognized = "";
      this.recognizing = true;
      console.log("record");
      //const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      const speechConfig = SpeechConfig.fromSubscription(
        "d36d147dcef24b0eb12d93548c4e46ef",
        "centralindia"
      );
      speechConfig.speechRecognitionLanguage = "en-US";
      speechConfig.enableDictation();
      this._recognizer = new SpeechRecognizer(speechConfig, audioConfig);
      this._recognizer.recognizing = this._recognizer.recognized =
        this.recognizerCallback.bind(this);
      this._recognizer.startContinuousRecognitionAsync();
    }
  }
  recognizerCallback(s, e) {
    console.log(e.result.text);
    const reason = ResultReason[e.result.reason];
    console.log(reason);
    if (reason == "RecognizingSpeech") {
      this.innerHtml = this.lastRecognized + e.result.text;
      this.searchInput = this.lastRecognized + e.result.text;
    }
    if (reason == "RecognizedSpeech") {
      this.lastRecognized += e.result.text + "\r\n";
      this.innerHtml = this.lastRecognized;
      this.searchInput = this.lastRecognized;
    }
  }
  stop() {
    this._recognizer.stopContinuousRecognitionAsync(
      stopRecognizer.bind(this),
      function (err) {
        stopRecognizer.bind(this);
        console.error(err);
      }.bind(this)
    );

    function stopRecognizer() {
      this._recognizer.close();
      this._recognizer = undefined;
      console.log("stopped");
    }
  }
}
