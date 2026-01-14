import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MicroService } from '../../../services/micro';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './board-details.html'
})
export class BoardDetails implements OnInit {
   board: any = null;
   mcu: any = null; // Micro Controller Unit
   mcus: any[] = [];
   isNew = true;
   id: number = 0;

   constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private service: MicroService,
    private cdr: ChangeDetectorRef
   ) {}

ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;

    this.service.getMicrocontrollers().subscribe({
      next: (data: any[]) => {
        this.mcus = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error loading MCUs", err)
    });

    if (this.id === 0) {
      this.isNew = true;
      this.board = { 
        id: 0, 
        name: '', 
        manufacturer: '', 
        flashKb: 1, 
        microcontrollerId: -1 
      };
    } else {
      this.isNew = false;
      this.service.getBoardById(this.id).subscribe({
        next: (data) => {
          this.board = data;
          if (data.microcontrollerId && data.microcontrollerId !== -1) {
            this.loadMcuDetails(data.microcontrollerId);
          }
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error loading board", err)
      });
    }
  }

  loadMcuDetails(mcuId: number): void {
    if (mcuId === -1) {
      this.mcu = null;
      return;
    }
    this.service.getMicrocontrollerById(mcuId).subscribe(data => this.mcu = data);
  }

   save(): void {
    this.board.microcontrollerId = Number(this.board.microcontrollerId);
    
    if (this.isNew) {
      this.service.addBoard(this.board).subscribe(() => this.router.navigate(["/"]));
    } else {
      this.service.updateBoard(this.board.id, this.board).subscribe(() => this.router.navigate(["/"]));
    }
   }

   delete(): void {
    if (confirm("Really delete this board?")) {
      this.service.deleteBoard(this.board.id).subscribe(() => this.router.navigate(["/"]));
    }
   }
}
