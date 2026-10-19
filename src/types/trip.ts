
import type { Dayjs } from "dayjs";

export interface TripLocation {
  name: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Trip {
  location: TripLocation;
  start: Dayjs | null;
  end: Dayjs | null;
}

