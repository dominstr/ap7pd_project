import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MicroService } from '../../services/micro';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './details.html'
})
export class Details implements OnInit {
   board: any = {id: 0, name: "", manufacturer: "", mcuId: 1, flashKb: 0, ramKb: 0};
   mcu: any = null; // Micro Controller Unit
   isNew = true;

   constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private service: MicroService
   ) {}

   ngOnInit(): void {
     const id = Number(this.route.snapshot.paramMap.get("id"));
     if (id !== 0) {
      this.isNew = false;
      this.service.getBoardById(id).subscribe(data => {
        this.board = data;
        this.loadMcuDetails(data.mcuId);
      });
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
