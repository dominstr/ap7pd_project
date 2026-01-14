import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MicroService } from '../../../services/micro';

@Component({
  selector: 'app-mcu-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mcu-details.html',
  styleUrl: './mcu-details.css'
})
export class McuDetails implements OnInit {
  id: number = 0;
  mcu: any = { id: 0, name: '', architecture: '', manufacturer: '', cores: 1, clockSpeedMhz: 1, ramKb: 1 };
  manufacturers: string[] = [];
  architectures: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MicroService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;

    this.service.getMicrocontrollers().subscribe({
      next: (data) => {
        this.architectures = [...new Set(data.map(m => m.architecture))].filter(x => x);
        this.manufacturers = [...new Set(data.map(m => m.manufacturer))].filter(x => x);

      }
    });

    if (this.id !== 0) {
      this.service.getMicrocontrollerById(this.id).subscribe({
        next: (data) => {
          this.mcu = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error loading MCU:', err)
      });
    }

    if (this.id !== 0) {
      this.service.getMicrocontrollerById(this.id).subscribe({
        next: (data) => this.mcu = data,
        error: (err) => console.error(err)
      });
    }
  }

  save(): void {
    if (this.id === 0) {
      this.service.addMicrocontroller(this.mcu).subscribe({
        next: () => this.router.navigate(['/mcu']),
        error: (err) => console.error('Error when saving:', err)
      });
    } else {
      this.service.updateMicrocontroller(this.id, this.mcu).subscribe({
        next: () => this.router.navigate(['/mcu']),
        error: (err) => console.error('Error when update:', err)
      });
    }
  }

  validatePositives(field: string): void {
    if (field === 'cores' && (this.mcu.cores < 1 || !this.mcu.cores)) {
      this.mcu.cores = 1;
    } else if (this.mcu[field] < 0 || !this.mcu[field]) {
      this.mcu[field] = 0;
    }
  }
}