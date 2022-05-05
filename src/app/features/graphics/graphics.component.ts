import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
//var CanvasJS = require('./canvasjs.min');

import { FirebaseService } from 'src/app/services/firebase.service';
import { PatientsService } from 'src/app/services/patients.service';
import { PatientParametersPuls } from 'src/app/shared/models/patient.interface';

@Component({
  selector: 'app-root',
  templateUrl: './graphics.component.html',
})
export class GraphicComponent implements OnInit {
  parametersList: PatientParametersPuls[] = [];

  constructor(
    private patientSvc: PatientsService,
    private firebaseSvc: FirebaseService
  ) {}
  ngOnInit() {
    var user = this.firebaseSvc.getCurrentUser();
    console.log(user);
    // this.patientSvc.getPatientParametersPuls(user.id).then((params) => {
    this.patientSvc
      .getPatientParametersPuls('16gFfA9pfMe8HP5KD6qPiQLLKTk1')
      .then((params) => {
        this.parametersList = params.docs.map(
          (x) => x.data() as PatientParametersPuls
        );

        console.log(this.parametersList[1].valMaxima);
        console.log(this.parametersList[1].valori);

        let dataList = [];
        let dataListTemp = [];
        let dataListEcg = [];
        let dataListUmiditate = [];

        ////////////date puls
        this.parametersList[1].valori.forEach(function (value) {
          var splitted = value.toString().split(';');
          var splitted2 = splitted[0].split('GMT');
          console.log(splitted);

          let JSONval = {
            y: Number(splitted[1]),
            label: splitted2[0],
          };
          dataList.push(JSONval);
        });

        /////////////date temperatura
        this.parametersList[2].valori.forEach(function (value) {
          var splittedTemp = value.toString().split(';');
          var splittedTemp2 = splittedTemp[0].split('GMT');
          console.log(splittedTemp);

          let JSONval = {
            y: Number(splittedTemp[1]),
            label: splittedTemp2[0],
          };
          dataListTemp.push(JSONval);
        });

        ////////////date ecg
        this.parametersList[0].valori.forEach(function (value) {
          var splitted = value.toString().split(';');
          var splitted2 = splitted[0].split('GMT');
          console.log(splitted);

          let JSONval = {
            y: Number(splitted[1]),
            label: splitted2[0],
          };
          dataListEcg.push(JSONval);
        });

        ////////////date umiditate
        this.parametersList[3].valori.forEach(function (value) {
          var splitted = value.toString().split(';');
          var splitted2 = splitted[0].split('GMT');
          console.log(splitted);

          let JSONval = {
            y: Number(splitted[1]),
            label: splitted2[0],
          };
          dataListUmiditate.push(JSONval);
        });

        //////////chart 1
        let chart = new CanvasJS.Chart('chartContainer', {
          animationEnabled: true,
          exportEnabled: true,
          axisY: {
            minimum: 0,
            maximum: 300,
            interval: 50,
          },
          title: {
            text: 'Grafic valori PULS',
          },
          data: [
            {
              type: 'line',
              dataPoints: dataList,
              //[
              //  { y: 71, label: 'Apple' },
              //  { y: 55, label: 'Mango' },
              //   { y: 50, label: 'Orange' },
              //{ y: 65, label: 'Banana' },
              ///   { y: 95, label: 'Pineapple' },
              //   { y: 68, label: 'Pears' },
              //  { y: 28, label: 'Grapes' },
              //   { y: 34, label: 'Lychee' },
              //   { y: 14, label: 'Jackfruit' },
              // ],
            },
          ],
        });

        chart.render();

        /////////chart 2

        let chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          exportEnabled: true,
          axisY: {
            minimum: 0,
            maximum: 40,
            interval: 2,
          },
          title: {
            text: 'Grafic valori TEMPERATURA',
          },
          data: [
            {
              type: 'line',
              dataPoints: dataListTemp,
            },
          ],
        });
        chart2.render();

        ////////chart 3

        let chart3 = new CanvasJS.Chart('chartContainer3', {
          animationEnabled: true,
          exportEnabled: true,
          axisY: {
            minimum: 0,
            maximum: 700,
            interval: 15,
          },
          title: {
            text: 'Grafic valori ECG',
          },
          data: [
            {
              type: 'line',
              dataPoints: dataListEcg,
            },
          ],
        });
        chart3.render();

        ////////chart 4

        let chart4 = new CanvasJS.Chart('chartContainer4', {
          animationEnabled: true,
          exportEnabled: true,
          axisY: {
            minimum: 30,
            maximum: 80,
            interval: 15,
          },
          title: {
            text: 'Grafic valori UMIDITATE',
          },
          data: [
            {
              type: 'line',
              dataPoints: dataListUmiditate,
            },
          ],
        });
        chart4.render();
      });
  }
}
