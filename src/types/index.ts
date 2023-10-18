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
