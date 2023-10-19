export interface ResData {
  statusCode: number;
  message: string;
  data?: unknown;
}

export interface ResDataNormal {
  statusCode: number;
  message: string;
  data?: Record<string, unknown>;
}

export type movieHallProps = {
  name: string;
  number: number;
  RoomType: Record<string, unknown>;
  Layout: Record<string, unknown>;
};

export type layoutType = {
  name: string;
  rows: number;
  seatsPerRow: number;
};
