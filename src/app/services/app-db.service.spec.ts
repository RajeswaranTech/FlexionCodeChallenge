import { TestBed } from '@angular/core/testing';

import { AppDBService } from './app-db.service';

describe('AppDBService', () => {
  let service: AppDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDBService);
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Check Farenheit to Rankine Conversion ', () => {
    expect(service.fnCheckTemperatureConversion(84.2,543.94,"Farenheit","Rankine")).toEqual("correct");
  });

  
  it('Check Kelvin to Farenheit Conversion ', () => {
    expect(service.fnCheckTemperatureConversion(317.33,111.554,"Kelvin","Farenheit")).toEqual("incorrect");
  }); 
  
  it('Check Kelvin to Celsiue Conversion ', () => {
    expect(service.fnCheckTemperatureConversion(4,5,"Kelvin","Celsius")).toEqual("incorrect");
  });


  it('Check Cups to Liters Conversion ', () => { 
    expect(service.fnCheckTemperatureConversion(25.6,6.1,"Cups","Liters")).toEqual("correct");
  });

  it('Check Gallons to Kelvin Conversion ', () => { 
    expect(service.fnCheckTemperatureConversion(73.12,19.4,"Gallons","Kelvin")).toEqual("invalid");
  });

  it('Check Farenheit to Rankine Conversion ', () => { 
    expect(service.fnCheckTemperatureConversion(6.5,"dog","Farenheit","Rankine")).toEqual("incorrect");
  });

  it('Check dog to Celsius Conversion ', () => { 
    expect(service.fnCheckTemperatureConversion(136.1,45.32,"dog","Celsius")).toEqual("invalid");
  });



  describe("temperature Conversion - Incorrect", function () {
    const testCases = [
      { inputUnit: "Kelvin", targetUnit: "Celsius", inputValue: 4, response: 5.8, result: "incorrect" },
      { inputUnit: "Kelvin", targetUnit: "Farenheit", inputValue: 41.4, response: 234.5, result: "incorrect"},
      { inputUnit: "Kelvin", targetUnit: "Rankine", inputValue: 34.87, response: 85.12, result: "incorrect" },
      { inputUnit: "Kelvin", targetUnit: "Kelvin", inputValue: 22.111, response: 15.38, result: "incorrect"},
      { inputUnit: "Rankine", targetUnit: "Celsius", inputValue: 28.9, response: 64.28, result: "incorrect"},            
      { inputUnit: "Rankine", targetUnit: "Farenheit", inputValue: 34.7, response: 58, result: "incorrect"},            
      { inputUnit: "Rankine", targetUnit: "Rankine", inputValue: 14.22, response: 77.99, result: "incorrect"},            
      { inputUnit: "Rankine", targetUnit: "Kelvin", inputValue: 23.23, response: -435.8, result: "incorrect"},            
      { inputUnit: "Farenheit", targetUnit: "Celsius", inputValue: 35.12, response: -95.2, result: "incorrect"},            
      { inputUnit: "Farenheit", targetUnit: "Farenheit", inputValue: 19.12, response: -87.118, result: "incorrect"},            
      { inputUnit: "Farenheit", targetUnit: "Rankine", inputValue: 254.22, response: 782.11, result: "incorrect"},            
      { inputUnit: "Farenheit", targetUnit: "Kelvin", inputValue: -23.78, response: 0.228, result: "incorrect"},            
      { inputUnit: "Celsius", targetUnit: "Celsius", inputValue: -78.4, response: 0.008, result: "incorrect"},            
      { inputUnit: "Celsius", targetUnit: "Farenheit", inputValue: -34.15, response: 7.0008, result: "incorrect"},            
      { inputUnit: "Celsius", targetUnit: "Rankine", inputValue: -4.33, response: 7.358, result: "incorrect"},            
      { inputUnit: "Celsius", targetUnit: "Farenheit", inputValue: -84.23, response: -5.78, result: "incorrect"},            

    ];
  
    testCases.forEach(test => {
      it(`should test temperature conversion from  ${test.inputUnit} to ${test.targetUnit} Incorrectly`, () => {
        expect(service.fnCheckTemperatureConversion(test.inputValue,test.response, test.inputUnit ,test.targetUnit)).toEqual(test.result);

      });
    });

  });

  describe("temperature Conversion - Correct", function () {
    const testCases = [
      { inputUnit: "Kelvin", targetUnit: "Celsius", inputValue: 34.89, response: -238.3, result: "correct" },
      { inputUnit: "Kelvin", targetUnit: "Farenheit", inputValue: 23, response: -418.32, result: "correct"},
      { inputUnit: "Kelvin", targetUnit: "Rankine", inputValue: 84.22, response: 151.6, result: "correct" },
      { inputUnit: "Kelvin", targetUnit: "Kelvin", inputValue: 151.6, response: 151.6, result: "correct"},
      { inputUnit: "Rankine", targetUnit: "Celsius", inputValue: 73.1, response: -232.5, result: "correct"},            
      { inputUnit: "Rankine", targetUnit: "Farenheit", inputValue: 79.88, response: -379.8, result: "correct"},            
      { inputUnit: "Rankine", targetUnit: "Rankine", inputValue: 14.22, response: 14.2, result: "correct"},            
      { inputUnit: "Rankine", targetUnit: "Kelvin", inputValue: 23.23, response: 12.9, result: "correct"},            
      { inputUnit: "Farenheit", targetUnit: "Celsius", inputValue: 35.12, response: 1.7, result: "correct"},            
      { inputUnit: "Farenheit", targetUnit: "Farenheit", inputValue: 19.12, response: 19.1222, result: "correct"},            
      { inputUnit: "Farenheit", targetUnit: "Rankine", inputValue: 254.22, response: 713.9, result: "correct"},            
      { inputUnit: "Farenheit", targetUnit: "Kelvin", inputValue: -23.78, response: 242.2, result: "correct"},            
      { inputUnit: "Celsius", targetUnit: "Celsius", inputValue: -78.4, response: -78.4, result: "correct"},            
      { inputUnit: "Celsius", targetUnit: "Farenheit", inputValue: -34.15, response: -29.5, result: "correct"},            
      { inputUnit: "Celsius", targetUnit: "Rankine", inputValue: -4.33, response: 483.9, result: "correct"},            
      { inputUnit: "Celsius", targetUnit: "Farenheit", inputValue: -84.23, response: -119.6, result: "correct"},            

    ];
  
    testCases.forEach(test => {
      it(`should test temperature conversion from  ${test.inputUnit} to ${test.targetUnit} correctly`, () => {
        expect(service.fnCheckTemperatureConversion(test.inputValue,test.response, test.inputUnit ,test.targetUnit)).toEqual(test.result);

      });
    });

  });



  describe("Volume Conversion - Correct", function () {
    const testCases = [
      { inputUnit: "Liters", targetUnit: "Liters", inputValue: 34.89, response: 34.89, result: "correct" },
      { inputUnit: "Liters", targetUnit: "Tablespoons", inputValue: 2, response: 135.3, result: "correct"},
      { inputUnit: "Liters", targetUnit: "cubicInches", inputValue: 3, response: 183.1, result: "correct" },
      { inputUnit: "Liters", targetUnit: "Cups", inputValue: 5, response: 20.8, result: "correct"},
      { inputUnit: "Liters", targetUnit: "cubicFeet", inputValue: 40, response: 1.4, result: "correct"},            
      { inputUnit: "Liters", targetUnit: "Gallons", inputValue: 4, response: 1.1, result: "correct"},            

      { inputUnit: "Tablespoons", targetUnit: "Liters", inputValue: 23, response: 0.3, result: "correct" },
      { inputUnit: "Tablespoons", targetUnit: "Tablespoons", inputValue: 23, response: 23, result: "correct"},
      { inputUnit: "Tablespoons", targetUnit: "cubicInches", inputValue: 235, response: 212.1, result: "correct" },
      { inputUnit: "Tablespoons", targetUnit: "Cups", inputValue: 230, response: 14.2, result: "correct"},
      { inputUnit: "Tablespoons", targetUnit: "cubicFeet", inputValue: 200, response: 0.1, result: "correct"},            
      { inputUnit: "Tablespoons", targetUnit: "Gallons", inputValue: 204, response: 0.8, result: "correct"},  

      { inputUnit: "cubicInches", targetUnit: "Liters", inputValue: 10, response: 0.2, result: "correct" },
      { inputUnit: "cubicInches", targetUnit: "Tablespoons", inputValue: 100, response: 110.8, result: "correct"},
      { inputUnit: "cubicInches", targetUnit: "cubicInches", inputValue: 84.22, response: 84.22, result: "correct" },
      { inputUnit: "cubicInches", targetUnit: "Cups", inputValue: 58, response: 4, result: "correct"},
      { inputUnit: "cubicInches", targetUnit: "cubicFeet", inputValue: 597, response: 0.3, result: "correct"},            
      { inputUnit: "cubicInches", targetUnit: "Gallons", inputValue: 59, response: 0.3, result: "correct"},  

      { inputUnit: "Cups", targetUnit: "Liters", inputValue: 5, response: 1.2, result: "correct" },
      { inputUnit: "Cups", targetUnit: "Tablespoons", inputValue: 8, response: 129.8, result: "correct"},
      { inputUnit: "Cups", targetUnit: "cubicInches", inputValue: 10, response: 146.5, result: "correct" },
      { inputUnit: "Cups", targetUnit: "Cups", inputValue: 151, response: 151, result: "correct"},
      { inputUnit: "Cups", targetUnit: "cubicFeet", inputValue: 15, response: 0.1, result: "correct"},            
      { inputUnit: "Cups", targetUnit: "Gallons", inputValue: 12, response: 0.8, result: "correct"},  
      
      { inputUnit: "cubicFeet", targetUnit: "Liters", inputValue: 17, response: 481.4, result: "correct" },
      { inputUnit: "cubicFeet", targetUnit: "Tablespoons", inputValue: 3, response: 5745, result: "correct"},
      { inputUnit: "cubicFeet", targetUnit: "cubicInches", inputValue: 4, response: 6912, result: "correct" },
      { inputUnit: "cubicFeet", targetUnit: "Cups", inputValue: 2, response: 236, result: "correct"},
      { inputUnit: "cubicFeet", targetUnit: "cubicFeet", inputValue: 73, response: 73, result: "correct"},            
      { inputUnit: "cubicFeet", targetUnit: "Gallons", inputValue: 27, response: 202, result: "correct"},  
      
      { inputUnit: "Gallons", targetUnit: "Liters", inputValue: 2, response: 7.6, result: "correct" },
      { inputUnit: "Gallons", targetUnit: "Tablespoons", inputValue: 2.2, response: 563.2, result: "correct"},
      { inputUnit: "Gallons", targetUnit: "cubicInches", inputValue: 2.1, response: 485.1, result: "correct" },
      { inputUnit: "Gallons", targetUnit: "Cups", inputValue: 6, response: 94.6, result: "correct"},
      { inputUnit: "Gallons", targetUnit: "cubicFeet", inputValue: 8, response: 1.1, result: "correct"},            
      { inputUnit: "Gallons", targetUnit: "Gallons", inputValue: 88, response: 88, result: "correct"},        
    ];
  
    testCases.forEach(test => {
      it(`should test temperature conversion from  ${test.inputUnit} to ${test.targetUnit} correctly`, () => {
        expect(service.fnCheckTemperatureConversion(test.inputValue,test.response, test.inputUnit ,test.targetUnit)).toEqual(test.result);

      });
    });

  });




  it('Check Initial data for Conversion ', done => {
    service.getConversionDetails.subscribe(result => {
      expect(result.length).toEqual(4);
      done();
    });
  });

  it('Check Initial data for Students ', done => {
    service.getStudentDetails.subscribe(result => {
      expect(result.length).toEqual(2);
      done();
    });
  });
  
  
});
