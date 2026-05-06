export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  links?: { label: string; href: string }[];
}

export const ARTICLES: Article[] = [];
