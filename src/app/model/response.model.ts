export default interface StatusResponse<T> {
  status?: string;
  message?: string;
  title?: string;
  data?: T;
}

