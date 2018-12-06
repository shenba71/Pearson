import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`localhost/users`);
    }

    getById(id: number) {
        return this.http.get(`localhost/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`localhost/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`localhost/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`localhost/users/${id}`);
    }
}