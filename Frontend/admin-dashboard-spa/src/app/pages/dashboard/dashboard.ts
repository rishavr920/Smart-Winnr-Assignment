import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../services/auth';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Ensure CommonModule is here
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;

  activeTab: string = 'users'; 
  users: any[] = []; 
  sales: any[] = [];
  totalUsers: number = 0;
  totalSales: number = 0;
  monthlySales: any[] = [];
  private chartInstance: Chart | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  onLogout() {
    this.authService.logout();
  }
  loadDashboard() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>('http://localhost:3000/api/admin/dashboard', { headers })
      .subscribe({
        next: res => {
          // 1. Data Assign karein
          this.totalUsers = res.totalUsers;
          this.totalSales = res.totalSales;
          this.monthlySales = res.monthlySales;

      
        this.users = res.users || []; 
        this.sales = res.sales || [];

          this.cdr.detectChanges();

      
          setTimeout(() => {
            this.renderChart();
          }, 200);
        },
        error: err => console.error(err)
      });
  }
  
// logic to change the role
toggleRole(user: any) {
  const newRole = user.role === 'Admin' ? 'User' : 'Admin';
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  // API Call to Update Role in MongoDB
  this.http.patch(`http://localhost:3000/api/admin/users/${user._id}/role`, { role: newRole }, { headers })
    .subscribe({
      next: () => {
        user.role = newRole; // UI update bina refresh ke
        alert(`${user.username} is now an ${newRole}`);
      },
      error: (err) => alert('Error updating role')
    });
}
 // Status change (Active <-> Inactive)
toggleUserStatus(user: any) {
  const newStatus = !user.isActive;
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  this.http.patch(`http://localhost:3000/api/admin/users/${user._id}/status`, { isActive: newStatus }, { headers })
    .subscribe({
      next: () => user.isActive = newStatus,
      error: (err) => alert('Error updating status')
    });
}
  renderChart() {
    if (!this.salesChartRef) return;
    
    const ctx = this.salesChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.monthlySales.map(m => {
          const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          return months[m._id - 1] || `Month ${m._id}`;
        }),
        datasets: [{
          label: 'Sales Revenue ($)',
          data: this.monthlySales.map(m => m.total),
          backgroundColor: '#3498db',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}