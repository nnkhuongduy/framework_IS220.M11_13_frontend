export enum LocationLevel {
  PROVINCE,
  WARD,
  BLOCK,
}

export enum LocationStatus {
  NEW,
  ACTIVE,
  ARCHIVED,
}

export interface Location {
  id: string;
  name: string;
  locationLevel: LocationLevel;
  status: LocationStatus;
  subLocations: string[];
}

export type LocationSnapshot = Pick<Location, 'name'>;
