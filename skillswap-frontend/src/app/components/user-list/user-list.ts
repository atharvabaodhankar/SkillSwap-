import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User, CreateUserRequest } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);
  showCreateForm = signal(false);
  newUser = signal<CreateUserRequest>({
    name: '',
    email: '',
    location: ''
  });

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe({
      next: (users) => this.users.set(users),
      error: (error) => console.error('Error loading users:', error)
    });
  }

  createUser() {
    if (this.newUser().name && this.newUser().email) {
      this.apiService.createUser(this.newUser()).subscribe({
        next: () => {
          this.loadUsers();
          this.resetForm();
        },
        error: (error) => console.error('Error creating user:', error)
      });
    }
  }

  resetForm() {
    this.newUser.set({ name: '', email: '', location: '' });
    this.showCreateForm.set(false);
  }
}