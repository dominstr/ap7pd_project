import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MicroService } from '../../../services/micro';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './board-list.html'
})
export class BoardList implements OnInit {
  boards: any[] = [];

  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private microService: MicroService,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
    this.loadData();

    // Debounce searching
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
      this.microService.searchBoards(this.searchTerm).subscribe({
        next: (data) => {
          this.boards = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error searching boards:", err)
      });
    } else {
      // Otherwise load all
      this.microService.getBoards().subscribe({
        next: (data) => {
          this.boards = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error loading boards:", err)
      });
    }
  }

  // Catch typing
  onSearch(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  deleteBoard(id: number): void {
    if (confirm('Opravdu chcete tuto vývojovou desku smazat?')) {
      this.microService.deleteBoard(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
