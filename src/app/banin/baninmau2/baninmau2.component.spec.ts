/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Baninmau2Component } from './baninmau2.component';

describe('Baninmau2Component', () => {
  let component: Baninmau2Component;
  let fixture: ComponentFixture<Baninmau2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Baninmau2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Baninmau2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
