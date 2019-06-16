import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewPage } from './search-view.page';

describe('SearchViewPage', () => {
  let component: SearchViewPage;
  let fixture: ComponentFixture<SearchViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
