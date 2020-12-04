import { Component, Inject, Optional  } from '@angular/core';
import { conversionData } from '../models/iConversionModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import  { AppDBService } from '../services/app-db.service';

@Component({
  selector: 'app-conversiondetail',
  templateUrl: './conversiondetail.component.html',
  styleUrls: ['./conversiondetail.component.scss']
})

export class ConversiondetailComponent {

  action:string;
  local_data:any;
  conv_values : any[] =[];
  blnValidInput: boolean = true;
  inputPrecision: number = 1;

  conversionType: any[] = [
    {value: 'TEMPERATURE', displayValue: 'Temperature'},
    {value: 'VOLUME', displayValue: 'Volume'},
  ];   

  temperatureUnits: any[] = [
    {value: 'Kelvin', displayValue: 'Kelvin'},
    {value: 'Celsius', displayValue: 'Celsius'},
    {value: 'Farenheit', displayValue: 'Farenheit'},
    {value: 'Rankine', displayValue: 'Rankine'}    
  ]; 
  
  volumeUnits: any[] = [
    {value: 'Liters', displayValue: 'Liters'},
    {value: 'Tablespoons', displayValue: 'Tablespoons'},
    {value: 'cubicInches', displayValue: 'Cubic Inches'},
    {value: 'Cups', displayValue: 'Cups'},
    {value: 'cubicFeet', displayValue: 'Cubic Feet'},
    {value: 'Gallons', displayValue: 'Gallons'},        
  ]; 



  constructor(
    public dialogRef: MatDialogRef<ConversiondetailComponent>, private AppService: AppDBService, 
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: conversionData) {

    this.local_data = {...data};
    this.action = this.local_data.action;
    this.assignConversionValues(this.local_data.convType);
  }

  doAction() {

    if (this.local_data.inputValue == undefined || (this.local_data.inputValue != undefined && isNaN(this.local_data.inputValue)) || (this.local_data.inputValue != undefined && !isNaN(this.local_data.inputValue) && this.local_data.convType == "VOLUME" && this.local_data.inputValue < 0 ) ) {
      this.blnValidInput = false; 
    } else {
      this.blnValidInput = true; 
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  convTypeChanged(conversionType) {
    this.assignConversionValues(conversionType);

  }

  assignConversionValues(conversionType) {

    if (conversionType == "TEMPERATURE") {
      this.conv_values = this.temperatureUnits;

      if (this.temperatureUnits.find(obj => obj.value == this.local_data.inputUnit) == undefined) {
        this.local_data.inputUnit= "Kelvin";
      }

      if (this.temperatureUnits.find(obj => obj.value == this.local_data.targetUnit) == undefined) {
        this.local_data.targetUnit= "Celsius";
      }      

    } else {
      this.conv_values = this.volumeUnits;

      if (this.volumeUnits.find(obj => obj.value == this.local_data.inputUnit) == undefined) {
        this.local_data.inputUnit= "Liters";
      }
      if (this.volumeUnits.find(obj => obj.value == this.local_data.targetUnit) == undefined) {
        this.local_data.targetUnit= "Tablespoons";
      }

    }
  }

  checkOutput(ctrlName, evnt) {

    console.log ("local_data.inputValue in Check Output",ctrlName,  evnt.target.value, this.local_data.inputValue, this.local_data.studentResponse);
    this.local_data[ctrlName] = evnt.target.value;
    
    let inputValue = Number(this.local_data.inputValue);
    let respValue = Number(this.local_data.studentResponse).toFixed(this.inputPrecision);
    let inputUnit = this.local_data.inputUnit;
    let targetUnit = this.local_data.targetUnit;

    this.local_data.output = this.getOutputResult(inputValue, respValue, inputUnit, targetUnit);   

  }


  getOutputResult(inputValue, respValue, inputUnit, targetUnit) {
    
    let retOutput : string = "";
    retOutput = this.AppService.fnCheckTemperatureConversion(inputValue, respValue, inputUnit, targetUnit);  
    return retOutput;

  }


  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}

