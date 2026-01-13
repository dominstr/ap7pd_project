import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MicroService } from '../../../services/micro';

@Component({
  selector: 'app-mcu-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mcu-list.html',
  styleUrl: './mcu-list.css'
})
export class McuList implements OnInit {
  mcus: any[] = [];

  constructor(private service: MicroService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.getMicrocontrollers().subscribe(data => {
      this.mcus = data;
      this.cdr.detectChanges();
    });
  }
}