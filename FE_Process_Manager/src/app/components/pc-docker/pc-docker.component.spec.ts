import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcDockerComponent } from './pc-docker.component';

describe('PcDockerComponent', () => {
  let component: PcDockerComponent;
  let fixture: ComponentFixture<PcDockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcDockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
