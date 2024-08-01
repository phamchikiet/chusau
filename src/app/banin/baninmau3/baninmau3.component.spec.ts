/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Baninmau3Component } from './baninmau3.component';

describe('Baninmau3Component', () => {
  let component: Baninmau3Component;
  let fixture: ComponentFixture<Baninmau3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Baninmau3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Baninmau3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
