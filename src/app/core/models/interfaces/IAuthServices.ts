export interface IAuthRegisterUserService {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface IAuthLoginUserService {
  usernameOrEmail: string;
  password: string;
}
