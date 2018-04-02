import { HttpHeaders, HttpParams } from '@angular/common/http';

export const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});