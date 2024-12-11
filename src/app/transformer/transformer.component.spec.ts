import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformerComponent } from './transformer.component';
import { HeaderComponent } from '../header/header.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TransformService } from '../transform.service';

describe('TransformerComponent', () => {
  let component: TransformerComponent;
  let fixture: ComponentFixture<TransformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, TransformerComponent],
      providers: [NgbModal, TransformService, HttpClient, HttpHandler]

    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid when the number input field is between 0 and 100 : 55', () => {
        component.numValue.setValue(55);
        expect(component.numValue.valid).toBeTruthy();
    });

  it('should be invalid when the number input field is null', () => {
      component.numValue.setValue(null);
      expect(component.numValue.valid).toBeFalsy();
  });

  it('should be invalid when the number input field is lower than zero : -1', () => {
        component.numValue.setValue(-1);
        expect(component.numValue.valid).toBeFalsy();
  });

  it('should be invalid when the number input field is greater than 100 : 1000', () => {
        component.numValue.setValue(1000);
        expect(component.numValue.valid).toBeFalsy();
  });
});
