export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}

export type NavRoute = {
  title: string;
  url: string;
};
