import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  private apiUrl = 'https://localhost:44304/api/businesscard';

  constructor(private http: HttpClient) { }

  getAllBusinessCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getBusinessCardById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateBusinessCard(id: number, businessCard: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, businessCard);
  }

  deleteBusinessCard(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  exportBusinessCards(format: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export?format=${format}`, { responseType: 'blob' });
  }

  exportBusinessCard(id: number, format: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/${id}/${format}`, { responseType: 'blob' });
  }

  createBusinessCard(businessCard: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Create`, businessCard);
  }
}
