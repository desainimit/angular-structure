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

export interface IAuthOtpService {
  otp: string;
}

export interface User {
  username: string;
  fullName: string;
  email: string;
  isLoggedIn?: boolean;
  roleId?: string;
  profileImage?: string;
}
