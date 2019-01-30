import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogConfigComponent } from './log-config.component';

describe('LogConfigComponent', () => {
  let component: LogConfigComponent;
  let fixture: ComponentFixture<LogConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
