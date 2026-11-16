export interface UserInfo {
  firstName: string;
  lastName: string;
  age: number | null;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: string;
}

export interface login {
  email: string;
  password: string;
}

export interface JWT {
  access_token: string;
  refresh_token: string;
}

export interface Register {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  role: string;
  zipcode: string;
  avatar: string;
  gender: string;
  phone: string;
  verified: boolean;
}
