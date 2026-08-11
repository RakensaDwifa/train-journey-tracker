export type ClassType = "Eksekutif" | "Bisnis" | "Ekonomi";
export type JourneyStatus = "Selesai" | "Akan Datang";

export interface Journey {
  id: number;
  date: string; // YYYY-MM-DD
  origin: string;
  destination: string;
  train_name: string;
  class_type: ClassType;
  price: number;
  status: JourneyStatus;
}

export interface NewJourney {
  date: string;
  origin: string;
  destination: string;
  train_name: string;
  class_type: ClassType;
  price: number;
  status: JourneyStatus;
}
