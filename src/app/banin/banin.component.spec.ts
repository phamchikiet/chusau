/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaninComponent } from './banin.component';

describe('BaninComponent', () => {
  let component: BaninComponent;
  let fixture: ComponentFixture<BaninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
