export type Fulfilled<D> = {
  type: 'FULFILLED';
  data: D;
};

export interface Error<E> {
  type: 'ERROR';
  error: E;
}
