/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mau2Component } from './mau2.component';

describe('Mau2Component', () => {
  let component: Mau2Component;
  let fixture: ComponentFixture<Mau2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mau2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mau2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
