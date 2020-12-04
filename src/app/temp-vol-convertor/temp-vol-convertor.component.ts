import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import  { AppDBService } from '../services/app-db.service';
import { conversionData } from '../models/iConversionModel';
import { ConversiondetailComponent } from '../conversiondetail/conversiondetail.component';

let ELEMENT_DATA: conversionData[] = [];

@Component({
  selector: 'app-temp-vol-convertor',
  templateUrl: './temp-vol-convertor.component.html',
  styleUrls: ['./temp-vol-convertor.component.scss']
})
export class TempVolConvertorComponent implements OnInit {

  public displayedColumns: string[] = [];

  arrStudents: any;
  dataSource: any[] = [];
  
  @ViewChildren(MatTable) table!: QueryList<MatTable<string>>;

  constructor(public dialog: MatDialog, private AppDBService: AppDBService) {}
  
  ngOnInit(): void {

    this.displayedColumns = ['inputValue','inputUnit','targetUnit','studentResponse','output','action'];  
    this.loadData();

  } 
  

  // Load initial data for students conversion
  loadData() {
    this.AppDBService.getStudentDetails.subscribe(retStudentDetails => {  
      this.arrStudents = retStudentDetails;

      this.AppDBService.getConversionDetails.subscribe((retConversionDetails) => {
        this.dataSource = [];
        retConversionDetails.forEach(indConvDetail => {

          if (this.dataSource[indConvDetail.student_id] == undefined) {
            this.dataSource[indConvDetail.student_id] = [];
          }
          this.dataSource[indConvDetail.student_id].push(indConvDetail);

        });
       
      })
    })
  }

  openMangeStudent(action,objID) {
     console.log ("Manage Student has to be coded, to add/edit/delete Student")
  }


  openConversion(action,obj,attr_id) {

    obj.action = action;
    if (obj.convType == undefined) {
      obj.convType = "TEMPERATURE";
      obj.inputUnit = "Kelvin";
      obj.targetUnit= "Celsius";
    } 

    const dialogRef = this.dialog.open(ConversiondetailComponent, {
      width: '600px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        console.log ("From Parent", result.event, result.data);
        if(result.event == 'Add'){
          this.addRowData(result.data,attr_id);
        }else if(result.event == 'Update'){
          this.updateRowData(result.data);
        }else if(result.event == 'Delete'){
          this.deleteRowData(result.data);
        }
      }
    });
  }


    // Add a new conversion record
  addRowData(row_obj,student_id) {

    if (row_obj.convType && row_obj.output.length > 0) {
      row_obj['student_id'] = student_id;
      row_obj['std_question_id'] = row_obj.student_id + "_" + Number(this.dataSource[student_id].length + 1);
        
      this.dataSource[student_id].push({
        student_id:row_obj.student_id,
        std_question_id: row_obj.std_question_id,
        convType: row_obj.convType,
        inputValue: row_obj.inputValue,
        inputUnit: row_obj.inputUnit,
        targetUnit: row_obj.targetUnit,
        studentResponse: row_obj.studentResponse,
        output: row_obj.output
      });
      // this.table.first.renderRows();
      this.table.forEach((tbl) => {
        tbl.renderRows();
      })
      // this.table.last.renderRows();

      console.log ("Now the data is" ,this.dataSource[student_id]);

    }
  }

  // Update existing conversion record
  updateRowData(row_obj) {
  
    this.dataSource[row_obj.student_id] = this.dataSource[row_obj.student_id].filter((value,key)=>{
      if(value.std_question_id == row_obj.std_question_id) {
        value.convType = row_obj.convType,
        value.inputValue = row_obj.inputValue,
        value.inputUnit = row_obj.inputUnit,
        value.targetUnit = row_obj.targetUnit,
        value.studentResponse = row_obj.studentResponse,
        value.output = row_obj.output    
      }

      return true;
    });
  }


  // delete selected conversion record
  deleteRowData(row_obj) {

    this.dataSource[row_obj.student_id] = this.dataSource[row_obj.student_id].filter((value,key)=> {

      return value.std_question_id != row_obj.std_question_id;
    });
  }

}
