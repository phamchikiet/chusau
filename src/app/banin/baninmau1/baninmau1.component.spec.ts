/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Baninmau1Component } from './baninmau1.component';

describe('Baninmau1Component', () => {
  let component: Baninmau1Component;
  let fixture: ComponentFixture<Baninmau1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Baninmau1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Baninmau1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
