
export interface User {
  entity_id: string;
  email: string;
  password: string;
  about?: string;
  photo?: string;
  name?: string;
  role?: string;
}

export interface IUser extends User {
  generateHash: (password: string) => string;
  validPassword: (password: string) => boolean;
}

export interface IHistory {
  entity_id: string;
  author_id: string;
  author_name: string;
  title: string;
  description?: string;
  cards?: string;
}
