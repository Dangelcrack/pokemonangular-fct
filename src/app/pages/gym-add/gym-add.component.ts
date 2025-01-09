import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GymService } from '../../services/gym.service';
import { Gym } from '../../models/gym';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-gym-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './gym-add.component.html',
  styleUrl: './gym-add.component.css',
})
export class GymAddComponent {
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";
  gymForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    leader: new FormControl(''),
    type: new FormControl(''),
  });

  constructor(private gymService: GymService) {}

  submitGym() {
    let newGym: Gym = {
      name: this.gymForm.value.name ?? "",
      location: this.gymForm.value.location ?? "",
      leader: this.gymForm.value.leader ?? "",
      type: this.gymForm.value.type ?? "",
    };

    this.gymService.addGym(newGym).then(() => {
      this.alertMessage = `¡Gimnasio ${this.gymForm.value.name} añadido con éxito!`;
      this.alertClass = "success";
      this.showAlert = true;
      this.gymForm.reset();
    }).catch((error) => {
      this.alertMessage = `Error al añadir el gimnasio ${this.gymForm.value.name}: ${error}`;
      this.alertClass = "danger";
      this.showAlert = true;
    });
  }
}
