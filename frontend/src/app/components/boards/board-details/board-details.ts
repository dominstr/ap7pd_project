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
   isNew = true;

   constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private service: MicroService,
    private cdr: ChangeDetectorRef
   ) {}

   ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    const id = idParam ? Number(idParam) : 0;

if (id !== 0) {
      this.isNew = false;
      this.service.getBoardById(id).subscribe({
        next: (data) => {
          this.board = data;
          if (data.microcontrollerId) {
            this.loadMcuDetails(data.microcontrollerId);
          }
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error loading board", err)
      });
    } else {
      this.isNew = true;
      // Default values for new board
      this.board = { id: 0, name: '', manufacturer: '', flashKb: 0, microcontrollerId: 0 };
    }
  }

   loadMcuDetails(mcuId: number): void {
    this.service.getMicrocontrollerById(mcuId).subscribe(data => this.mcu = data);
   }

   save(): void {
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
