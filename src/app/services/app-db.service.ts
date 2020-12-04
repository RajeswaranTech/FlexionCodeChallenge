import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDBService {

  constructor() { }

  sampleStudentData : any[] = [
    {student_id: "1001", name : "Chris"},
    {student_id: "1002", name : "Amanda"}
    // {student_id: "1003", name : "Amanda"}
  ]
  inputPrecision: number = 1;
  
  sampleCoversionData: any[] = [
    {student_id: "1001", std_question_id: "1001_1", convType:"TEMPERATURE", inputValue:84.2, inputUnit : "Farenheit", targetUnit: "Rankine", studentResponse: 543.94, output: "correct"},
    {student_id: "1001", std_question_id: "1001_2", convType:"TEMPERATURE", inputValue:317.33, inputUnit : "Kelvin", targetUnit: "Farenheit", studentResponse:  111.554, output: "incorrect"},
    {student_id: "1002", std_question_id: "1002_1", convType:"VOLUME", inputValue:25.6, inputUnit : "Cups", targetUnit: "Liters", studentResponse: 6.1, output: "correct"},
    {student_id: "1002", std_question_id: "1002_2", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "cubicInches", studentResponse:  19.4, output: "incorrect"}
    // {student_id: "1003", std_question_id: "1003_1", convType:"VOLUME", inputValue:25.6, inputUnit : "Cups", targetUnit: "Liters", studentResponse: 6.1, output: "correct"},
    // {student_id: "1003", std_question_id: "1003_2", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: "invalid"}
  ]

  private pStudentDetails = new BehaviorSubject(this.sampleStudentData);
  getStudentDetails = this.pStudentDetails.asObservable();
  
  changeStudentDetails(newStudDetail: any[]) {
    this.pStudentDetails.next(newStudDetail);
  }

  
  private pConversionDetails = new BehaviorSubject(this.sampleCoversionData);
  getConversionDetails = this.pConversionDetails.asObservable();
  
  changeConversionDetails(newConvDetail: any[]) {
    this.pStudentDetails.next(newConvDetail);
  }

  
  fnCheckTemperatureConversion (inputValue, respValue, inputUnit, targetUnit) {
  
    // Below assignment can be done from a configuration file to add more conversion as reqruied

    let convFormulae: string[] = [];
    respValue = Number(respValue).toFixed(this.inputPrecision);
    let inputPrecision = this.inputPrecision;
    let retResult: string = "";

    convFormulae["Kelvin_Celsius"] = "(inputValue - 273.15).toFixed(inputPrecision)";
    convFormulae["Kelvin_Farenheit"] = "((inputValue - 273.15) * (9/5) + 32) .toFixed(inputPrecision)";
    convFormulae["Kelvin_Rankine"] = "(inputValue * 1.8).toFixed(inputPrecision)";
    convFormulae["Kelvin_Kelvin"] = "(inputValue).toFixed(inputPrecision)";
    
    convFormulae["Rankine_Celsius"] = "((inputValue - 491.67) * (5/9)) .toFixed(inputPrecision)";
    convFormulae["Rankine_Farenheit"] = "(inputValue - 459.67) .toFixed(inputPrecision)";
    convFormulae["Rankine_Rankine"] = "(inputValue).toFixed(inputPrecision)";
    convFormulae["Rankine_Kelvin"] = "((inputValue) * (5/9)) .toFixed(inputPrecision)";

    convFormulae["Farenheit_Celsius"] = "((inputValue - 32) * (5/9)).toFixed(inputPrecision)";
    convFormulae["Farenheit_Farenheit"] = "(inputValue).toFixed(inputPrecision)";
    convFormulae["Farenheit_Rankine"] = "(inputValue + 459.67).toFixed(inputPrecision) ";
    convFormulae["Farenheit_Kelvin"] = "((inputValue -32) * (5/9) + 273.15).toFixed(inputPrecision)";

    convFormulae["Celsius_Celsius"] = "(inputValue).toFixed(inputPrecision)";
    convFormulae["Celsius_Farenheit"] = "((inputValue)  * (9/5) + 32) .toFixed(inputPrecision)";
    convFormulae["Celsius_Rankine"] = "((inputValue) * (9/5) + 491.67).toFixed(inputPrecision) ";
    convFormulae["Celsius_Kelvin"] = "(inputValue + 273.15).toFixed(inputPrecision)";


    convFormulae["Liters_Liters"] = "(inputValue).toFixed(inputPrecision)";             
    convFormulae["Liters_Tablespoons"] = "(inputValue * 67.628).toFixed(inputPrecision)";
    convFormulae["Liters_cubicInches"] = "(inputValue * 61.024).toFixed(inputPrecision)";
    convFormulae["Liters_Cups"] = "(inputValue * 4.167).toFixed(inputPrecision)";
    convFormulae["Liters_cubicFeet"] = "(inputValue / 28.317).toFixed(inputPrecision)";
    convFormulae["Liters_Gallons"] = "(inputValue / 3.785).toFixed(inputPrecision)";

    convFormulae["Tablespoons_Liters"] = "(inputValue / 67.628).toFixed(inputPrecision)";             
    convFormulae["Tablespoons_Tablespoons"] = "(inputValue).toFixed(inputPrecision)";
    convFormulae["Tablespoons_cubicInches"] = "(inputValue / 1.108).toFixed(inputPrecision)";
    convFormulae["Tablespoons_Cups"] = "(inputValue / 16.231).toFixed(inputPrecision)";
    convFormulae["Tablespoons_cubicFeet"] = "(inputValue / 1915).toFixed(inputPrecision)";
    convFormulae["Tablespoons_Gallons"] = "(inputValue / 256).toFixed(inputPrecision)";
    
    convFormulae["cubicInches_Liters"] = "(inputValue / 61.024).toFixed(inputPrecision)";             
    convFormulae["cubicInches_Tablespoons"] = "(inputValue * 1.108).toFixed(inputPrecision)";
    convFormulae["cubicInches_cubicInches"] = "(inputValue).toFixed(inputPrecision)";
    convFormulae["cubicInches_Cups"] = "(inputValue / 14.646).toFixed(inputPrecision)";
    convFormulae["cubicInches_cubicFeet"] = "(inputValue / 1728).toFixed(inputPrecision)";
    convFormulae["cubicInches_Gallons"] = "(inputValue / 231).toFixed(inputPrecision)";
    
    convFormulae["Cups_Liters"] = "(inputValue / 4.167).toFixed(inputPrecision)";             
    convFormulae["Cups_Tablespoons"] = "(inputValue * 16.231).toFixed(inputPrecision)";
    convFormulae["Cups_cubicInches"] = "(inputValue * 14.646).toFixed(inputPrecision)";
    convFormulae["Cups_Cups"] = "(inputValue).toFixed(inputPrecision)";
    convFormulae["Cups_cubicFeet"] = "(inputValue / 118).toFixed(inputPrecision)";
    convFormulae["Cups_Gallons"] = "(inputValue / 15.773).toFixed(inputPrecision)";
    
    convFormulae["cubicFeet_Liters"] = "(inputValue * 28.317).toFixed(inputPrecision)";             
    convFormulae["cubicFeet_Tablespoons"] = "(inputValue * 1915).toFixed(inputPrecision)";
    convFormulae["cubicFeet_cubicInches"] = "(inputValue * 1728).toFixed(inputPrecision)";
    convFormulae["cubicFeet_Cups"] = "(inputValue * 118).toFixed(inputPrecision)";
    convFormulae["cubicFeet_cubicFeet"] = "(inputValue).toFixed(inputPrecision)";
    convFormulae["cubicFeet_Gallons"] = "(inputValue * 7.481).toFixed(inputPrecision)";
    
    convFormulae["Gallons_Liters"] = "(inputValue * 3.785).toFixed(inputPrecision)";             
    convFormulae["Gallons_Tablespoons"] = "(inputValue * 256).toFixed(inputPrecision)";
    convFormulae["Gallons_cubicInches"] = "(inputValue * 231).toFixed(inputPrecision)";
    convFormulae["Gallons_Cups"] = "(inputValue * 15.773).toFixed(inputPrecision)";
    convFormulae["Gallons_cubicFeet"] = "(inputValue / 7.481).toFixed(inputPrecision)";
    convFormulae["Gallons_Gallons"] = "(inputValue).toFixed(inputPrecision)";
       
    // Below 7 lines is the core for getting temperature and volume conversion.
    
    console.log ("Expected output is >>> ", eval(convFormulae[inputUnit + "_" + targetUnit]));

    if (convFormulae[inputUnit + "_" + targetUnit] != undefined) {
      if (respValue == eval(convFormulae[inputUnit + "_" + targetUnit]) ) {
        retResult = "correct";
      } else {
        retResult = "incorrect";
      }

    } else {
      retResult = "invalid";
    } 
    
      return retResult;
    }

 
  // Mostly people might write like below, which will work but a lengthy coding and not optimized 
  // fnCheckTemperatureConversion_Conventional (inputValue, respValue, inputUnit, targetUnit) {

  //   respValue = Number(respValue).toFixed(1);
  //   let retOutput: string = "";

  //   if (inputUnit == "Kelvin") {
  //     switch (targetUnit) {
  //       case "Celsius" : {
  //         if (respValue == (inputValue - 273.15).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Farenheit" : {

  //         if (respValue == ((inputValue - 273.15) * (9/5) + 32) .toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }
        
  //       case "Rankine" : {

  //         if (respValue == (inputValue * 1.8).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Kelvin" : {

  //         if (respValue == (inputValue).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //     }
  //   } else if (inputUnit == "Rankine") {
    
  //     switch (targetUnit) {
  //       case "Celsius" : {
 
  //         if (respValue == ((inputValue - 491.67) * (5/9)) .toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Farenheit" : {

  //         if (respValue == (inputValue - 459.67) .toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }
        
  //       case "Rankine" : {

  //         if (respValue == (inputValue) .toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Kelvin" : {

  //         if (respValue == ((inputValue) * (5/9)) .toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //     }
      
  //   } else if (inputUnit == "Farenheit") {
    
  //     switch (targetUnit) {
  //       case "Celsius" : {

  //         if (respValue == ((inputValue - 32) * (5/9)).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Farenheit" : {

  //         if (respValue == (inputValue).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }
        
  //       case "Rankine" : {
  //         if (respValue == (inputValue + 459.67).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Kelvin" : {

  //         if (respValue == ((inputValue -32) * (5/9) + 273.15).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //     }    
  //   } else if (inputUnit == "Celsius") {
    
  //     switch (targetUnit) {
  //       case "Celsius" : {

  //         if (respValue == (inputValue).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Farenheit" : {

  //         if (respValue == ((inputValue)  * (9/5) + 32) .toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }
        
  //       case "Rankine" : {

  //         if (respValue == ((inputValue) * (9/5) + 491.67).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //       case "Kelvin" : {

  //         if (respValue == (inputValue + 273.15).toFixed(1) ) {
  //           retOutput = "correct";
  //         } else {
  //           retOutput = "incorrect";
  //         }
  //         break;
  //       }

  //     }    
  //   } 

  //   return retOutput;
  // }






}
