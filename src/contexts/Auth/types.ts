import { UserDTO } from "@dtos/user.dto";

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type SignInRequestPayload = {
  email: string;
  password: string;
};

export type AuthContextStateType = {
  user: UserDTO;
  loadingUserData: boolean;
  signOut(): Promise<void>;
  signIn(payload: SignInRequestPayload): Promise<void>;
};
