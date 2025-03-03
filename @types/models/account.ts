export interface UserModel {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string;
  numberPhone: string;
  role: string;
}

export interface UserLogin extends Partial<UserModel> {}

export interface LoginResponse {
  accessToken: string;
  data: {
    user: UserLogin;
  };
  status: string;
}

export interface ErrorResponse {
  messageError: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
}
