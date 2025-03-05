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
  refreshToken: string;
  data: {
    user: UserLogin;
  };
  status: string;
}

export interface ErrorObject {
  messageError: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
  name?: string;
  expiredAt?: string;
}
export interface ErrorResponse {
  status: string;
  error: ErrorObject;
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
