import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';

const GUITARS_DB = 'guitar_item';

export interface GuitarItem {
  id: number;
  model: string;
  brand: string;
  categorie: string;
  year_of_manufacture: number;
  price: number;
  body_material: string;
  number_of_strings: number;
  photo_url: string;
  date_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Método para obtener todos los elementos de la tabla guitar_item
  async getAllGuitarItems(): Promise<GuitarItem[]> {
    try {
      const { data, error } = await this.supabase
        .from(GUITARS_DB) 
        .select('*');

      if (error) {
        console.error('Error fetching guitar items:', error);
        return [];
      }

      // Hacemos un casting explícito a GuitarItem[]
      return (data as GuitarItem[]) || [];
    } catch (error) {
      console.error('Unexpected error fetching guitar items:', error);
      return [];
    }
  }

  // Método opcional para obtener guitarras por categoría
  async getGuitarsByCategory(categorie: string): Promise<GuitarItem[]> {
    try {
      const { data, error } = await this.supabase
        .from(GUITARS_DB) 
        .select('*')
        .eq('categorie', categorie);

      if (error) {
        console.error(`Error fetching guitars by category ${categorie}:`, error);
        return [];
      }

      // Hacemos un casting explícito a GuitarItem[]
      return (data as GuitarItem[]) || [];
    } catch (error) {
      console.error('Unexpected error fetching guitars by category:', error);
      return [];
    }
  }
}
