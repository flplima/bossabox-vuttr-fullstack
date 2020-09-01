export interface Tool {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}
