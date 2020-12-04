import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConversiondetailComponent } from './conversiondetail.component';

describe('ConversiondetailComponent', () => {
  let component: ConversiondetailComponent;
  let fixture: ComponentFixture<ConversiondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversiondetailComponent ],
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
    fixture = TestBed.createComponent(ConversiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => document.querySelector('#temp_vol_container').remove());


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change type to Volume', () => {
    component.assignConversionValues("VOLUME");
    expect(component.conv_values.length).toEqual(6);
  });
  
  it('should change type to Temperature', () => {
    component.convTypeChanged("TEMPERATURE");
    expect(component.conv_values.length).toEqual(4);
  });
  
  it('should check event for Temperature', () => {

    component.local_data.respValue = -250.1;
    component.local_data.inputUnit = "Kelvin";
    component.local_data.targetUnit = "Celsius";
    component.checkOutput("inputValue", {target: {value: 23}});

    expect(component.local_data.inputValue).toEqual(23);
  });



});
