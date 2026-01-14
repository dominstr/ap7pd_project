import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MicroService {
  private apiUrl = 'https://reimagined-waddle-wq55vvg7wxgh57xp-5014.app.github.dev/api'; 

  constructor(private http: HttpClient) { }

  // All Boards
  getBoards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/boards`);
  }

  // Filter boards search
  searchBoards(q: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/boards/search?q=${q}`);
  }

  // Single Board by ID
  getBoardById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/boards/${id}`);
  }

  // Add new Board
  addBoard(board: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/boards`, board);
  }

  // Edit existing Board
  updateBoard(id: number, board: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/boards/${id}`, board);
  }

  // Delete Board
  deleteBoard(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/boards/${id}`);
  }

  // Get all MCU
  getMicrocontrollers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mcu`);
  }

  // Filter MCU search
  searchMcus(q: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mcu/search?q=${q}`);
  }

  // Single MCU detail by ID
  getMicrocontrollerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mcu/${id}`);
  }

  // Add new MCU
  addMicrocontroller(mcu: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mcu`, mcu);
  }

  // Edit MCU
  updateMicrocontroller(id: number, mcu: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/mcu/${id}`, mcu);
  }

  // Delete MCU
  deleteMicrocontroller(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mcu/${id}`);
  }
}
