export interface UserDTO {
  email: string;
  password: string;
}

export interface User extends UserDTO {
  id: number;
  fullName: string;
  imageUrl: string;
}

export interface UserResponseLogin {
  user: User | null;
  accessToken: string | null;
}

export interface UserRequestRegister {
  type: string;
  user: {
    email: string;
    password: string;
    fullName: string;
    imageUrl: string;
  };
}
