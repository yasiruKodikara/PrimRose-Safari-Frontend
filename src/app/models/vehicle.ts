export interface Vehicle {
  id?: number;
  model: string;
  type: string;
  price_per_day: number;
  imageUrl: string;
  status: 'available' | 'unavailable' | string;
}
