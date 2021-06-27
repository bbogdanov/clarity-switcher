export interface PostMessage<T> {
  type: string;
  data: T;
}
