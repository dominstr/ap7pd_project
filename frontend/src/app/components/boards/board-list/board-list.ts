import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MicroService } from '../../../services/micro';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board-list.html'
})
export class BoardList implements OnInit {
  boards: any[] = [];

  constructor(private microService: MicroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.microService.getBoards().subscribe({
      next: (data) => {
        this.boards = data;
        console.log("Data loaded:", data);
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error when loading data:", err)
    });
  }
}
