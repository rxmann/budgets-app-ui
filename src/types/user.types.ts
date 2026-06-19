export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  isActive: boolean;
  roles: string[];
  authProviderType: string;
}

export interface User {
  id: string;
  createdAt?: string;
  lastModifiedAt?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  email: string;
  username: string;
  passwordHash?: string;
  isActive: boolean;
  accountLocked?: boolean;
  roles: string[];
  providerId?: string;
  authProviderType: "GOOGLE" | "GITHUB" | "EMAIL";
}
