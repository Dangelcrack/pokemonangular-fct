import { Component, OnInit } from '@angular/core';
import { GymService } from '../../services/gym.service';
import { Gym } from '../../models/gym';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gym-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.css']
})
export class GymListComponent implements OnInit {
  gyms: Gym[] = [];
  isLoading: boolean = true;  // Estado de carga

  constructor(private gymService: GymService) {}

  ngOnInit(): void {
    this.gymService.getGyms().subscribe({
      next: (gyms) => {
        this.gyms = gyms;
        this.isLoading = false;  // Los datos ya se cargaron
      },
      error: (err) => {
        console.error('Error al obtener los gimnasios:', err);
        alert('Ocurrió un error al cargar los datos.');
        this.isLoading = false; 
      },
    });
  }

  deleteGym(id: string): void {
    this.gymService.deleteGym(id);
  }
}
