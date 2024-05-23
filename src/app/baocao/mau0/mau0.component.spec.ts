/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mau0Component } from './mau0.component';

describe('Mau0Component', () => {
  let component: Mau0Component;
  let fixture: ComponentFixture<Mau0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mau0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mau0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
