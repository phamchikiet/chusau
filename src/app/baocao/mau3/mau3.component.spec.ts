/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mau3Component } from './mau3.component';

describe('Mau3Component', () => {
  let component: Mau3Component;
  let fixture: ComponentFixture<Mau3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mau3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mau3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
