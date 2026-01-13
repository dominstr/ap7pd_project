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

  // Single Board by ID
  getBoardById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/boards/${id}`);
  }

  // Single Microcontroller detail by ID
  getMicrocontrollerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/microcontrollers/${id}`);
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
}
