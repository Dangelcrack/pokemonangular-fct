import { Injectable } from '@angular/core';
import { Firestore, collection, getDoc, getDocs, CollectionReference, addDoc, doc, updateDoc, deleteDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gym } from '../models/gym';

@Injectable({
  providedIn: 'root',
})
export class GymService {
  private gymCollection: CollectionReference<Gym>;

  constructor(private firestore: Firestore) {
    // Inicializamos la referencia a la colección 'gyms'
    this.gymCollection = collection(this.firestore, 'gyms') as CollectionReference<Gym>;
  }

  // Obtener todos los gimnasios
  getGyms(): Observable<Gym[]> {
    return from(getDocs(this.gymCollection)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  }

  // Obtener un gimnasio por ID
  getGym(id: string): Observable<Gym | undefined> {
    const gymDocRef = doc(this.firestore, `gyms/${id}`) as DocumentReference<Gym>;
    return from(getDoc(gymDocRef)).pipe(
      map((docSnapshot) => docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : undefined)
    ) as Observable<Gym | undefined>;
  }

  // Agregar un nuevo gimnasio
  addGym(gym: Gym): Promise<void> {
    return addDoc(this.gymCollection, gym).then(() => {});
  }

  // Actualizar un gimnasio existente
  updateGym(id: string, gym: Partial<Gym>): Promise<void> {
    const gymDocRef = doc(this.firestore, `gyms/${id}`);
    return updateDoc(gymDocRef, gym);
  }

  // Eliminar un gimnasio
  deleteGym(id: string): Promise<void> {
    const gymDocRef = doc(this.firestore, `gyms/${id}`);
    return deleteDoc(gymDocRef);
  }
}
