import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial totalUsers as 0', () => {
    expect(component.totalUsers).toBe(0);
  });

  it('should have initial totalSales as 0', () => {
    expect(component.totalSales).toBe(0);
  });

  it('should have empty monthlySales initially', () => {
    expect(component.monthlySales.length).toBe(0);
  });
});
