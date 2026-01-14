import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MicroService } from '../../../services/micro';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-mcu-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mcu-list.html',
  styleUrl: './mcu-list.css'
})
export class McuList implements OnInit {
  mcus: any[] = [];

  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private service: MicroService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadData();

    // Debounce search
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.loadData();
    });
  }

  loadData(): void {
    if (this.searchTerm.trim()) {
      // Search endpoint when searching
      this.service.searchMcus(this.searchTerm).subscribe(data => {
        this.mcus = data;
        this.cdr.detectChanges();
      });
    } else {
      // Otherwise load all
      this.service.getMicrocontrollers().subscribe(data => {
        this.mcus = data;
        this.cdr.detectChanges();
      });
    }
  }

  // Catch typing
  onSearch(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  deleteMcu(id: number): void {
    if (confirm('Opravdu chcete tento mikrokontrolér smazat?')) {
      this.service.deleteMicrocontroller(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}