import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TempVolConvertorComponent } from './temp-vol-convertor.component';

describe('TempVolConvertorComponent', () => {
  let component: TempVolConvertorComponent;
  let fixture: ComponentFixture<TempVolConvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempVolConvertorComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MatDialogModule,
          useValue: {}
        },
        {
          provide: MatDialog,
          useValue: {}
        }                  
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempVolConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => document.querySelector('#temp_vol_container').remove());


  it('should add new row to student 1002', () => {

    let sampleData = {student_id: "1002", std_question_id: "1002_3", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: "invalid"};
    component.addRowData(sampleData,1002);
    expect(component.dataSource["1002"].length).toEqual(3);

  });

  it('should not add new row to student 1002', () => {

    let sampleData = {student_id: "1002", std_question_id: "1002_3", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: ""};
    component.addRowData(sampleData,1002);
    expect(component.dataSource["1002"].length).toEqual(2);

  });

  it('should not add new row to student 1002 since there is no conversion type', () => {

    let sampleData = {student_id: "1002", std_question_id: "1002_3", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: ""};
    component.addRowData(sampleData,1002);
    expect(component.dataSource["1002"].length).toEqual(2);

  });



  it('should modify a row on student 1002', () => {

    let sampleData = {student_id: "1002", std_question_id: "1002_2", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: "invalid"};
    component.updateRowData(sampleData);
    expect(component.dataSource["1002"].length).toEqual(2);

  });

  it('should not modify a row on student 1002', () => {

    let sampleData = {student_id: "1002", std_question_id: "1002_12", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: "invalid"};
    component.updateRowData(sampleData);
    expect(component.dataSource["1002"].length).toEqual(2);

  });


  it('should delete a row in student 1002', () => {

    let sampleData = {student_id: "1002", std_question_id: "1002_2", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: "invalid"};
    component.deleteRowData(sampleData);
    expect(component.dataSource["1002"].length).toEqual(1);

  });

  
  it('should not delete a row in student 1002', () => {

    let sampleData = {student_id: "1002", std_question_id: "1002_52", convType:"VOLUME", inputValue:73.12, inputUnit : "Gallons", targetUnit: "Kelvin", studentResponse:  19.4, output: "invalid"};
    component.deleteRowData(sampleData);
    expect(component.dataSource["1002"].length).toEqual(2);

  });


  it('should load data  for two students, each two records', () => {

    component.loadData();
    expect(component.dataSource["1001"].length).toEqual(2);
    expect(component.dataSource["1002"].length).toEqual(2);

  });
  

});
