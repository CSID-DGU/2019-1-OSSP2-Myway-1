import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLikePage } from './my-like.page';

describe('MyLikePage', () => {
  let component: MyLikePage;
  let fixture: ComponentFixture<MyLikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLikePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
