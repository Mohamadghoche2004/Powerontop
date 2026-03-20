export interface UsersTableData {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: string | number | boolean;
  }