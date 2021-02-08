import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPcDockerComponent } from './dialog-pc-docker.component';

describe('DialogPcDockerComponent', () => {
  let component: DialogPcDockerComponent;
  let fixture: ComponentFixture<DialogPcDockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPcDockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPcDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
