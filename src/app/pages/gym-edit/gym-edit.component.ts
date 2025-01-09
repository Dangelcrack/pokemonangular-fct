import { Component, OnInit } from '@angular/core';
import { GymService } from '../../services/gym.service';
import { Gym } from '../../models/gym';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-gym-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './gym-edit.component.html',
  styleUrls: ['./gym-edit.component.css']
})
export class GymEditComponent implements OnInit {
  gym: Gym = { name: '', location: '', leader: '', type: '' }; // Inicializamos con un objeto vacío
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';

  constructor(
    private gymService: GymService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loadGym().subscribe({
        next: (gymData) => {
          if (gymData) {
            this.gym = gymData;
          } else {
            this.showAlertMessage(`El gimnasio con ID ${this.id} no existe.`, 'danger');
          }
        },
        error: (error) => {
          console.error('Error al cargar el gimnasio:', error);
          this.showAlertMessage(`Error al cargar el gimnasio: ${error.message || error}`, 'danger');
        }
      });
    } else {
      this.showAlertMessage('ID del gimnasio no proporcionado.', 'danger');
    }
  }

  private loadGym() {
    return this.gymService.getGym(this.id);
  }

  updateGym(): void {
    if (this.id && this.gym) {
      this.gymService.updateGym(this.id, this.gym).then(() => {
        this.showAlertMessage('¡Gimnasio editado correctamente!', 'success');
        setTimeout(() => {
          this.router.navigate(['/gyms']);
        }, 2000);
      }).catch((error) => {
        console.error('Error al actualizar el gimnasio:', error);
        this.showAlertMessage(`Error al editar el gimnasio: ${error.message || error}`, 'danger');
      });
    } else {
      this.showAlertMessage('ID del gimnasio no proporcionado para la actualización.', 'danger');
    }
  }

  private showAlertMessage(message: string, type: 'success' | 'danger'): void {
    this.alertMessage = message;
    this.alertClass = type;
    this.showAlert = true;
    setTimeout(() => (this.showAlert = false), 3000);
  }
}
