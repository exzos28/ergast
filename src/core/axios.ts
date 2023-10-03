import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ergast.com/api/',
  timeout: 10000,
});

export default instance;

export type PaginationResponse<T extends string, R> = {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
  } & {[key in T]: R};
};

export type FullyResponse<T extends string, R> = {
  MRData: {
    xmlns: string;
    series: string;
  } & {[key in T]: R};
};
