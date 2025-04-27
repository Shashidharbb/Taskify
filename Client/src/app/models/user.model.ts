export interface UserModel {
    ID?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
    country?: string;
    allowToDelete?: boolean;
    active?: boolean;
    createdDate?: string;
    updatedDate?: string;
  }