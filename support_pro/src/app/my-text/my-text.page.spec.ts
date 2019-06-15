import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTextPage } from './my-text.page';

describe('MyTextPage', () => {
  let component: MyTextPage;
  let fixture: ComponentFixture<MyTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
