export interface ApiResponse<T> {
  status: string;
  data: T;
  mensaje: string;
}
