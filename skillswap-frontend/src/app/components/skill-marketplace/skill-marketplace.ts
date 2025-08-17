import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-marketplace',
  imports: [CommonModule, RouterLink],
  templateUrl: './skill-marketplace.html',
  styleUrl: './skill-marketplace.scss'
})
export class SkillMarketplaceComponent implements OnInit {
  offeredSkills = signal<Skill[]>([]);
  requestedSkills = signal<Skill[]>([]);
  activeTab = signal<'offered' | 'requested'>('offered');

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.apiService.getOfferedSkills().subscribe({
      next: (skills) => this.offeredSkills.set(skills),
      error: (error) => console.error('Error loading offered skills:', error)
    });

    this.apiService.getRequestedSkills().subscribe({
      next: (skills) => this.requestedSkills.set(skills),
      error: (error) => console.error('Error loading requested skills:', error)
    });
  }

  setActiveTab(tab: 'offered' | 'requested') {
    this.activeTab.set(tab);
  }
}