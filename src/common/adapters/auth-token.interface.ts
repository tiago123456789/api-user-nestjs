export interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthTokenInterface {
  get(payload: TokenPayload): Promise<string>;
  isValid(token: string): Promise<boolean | TokenPayload>;
}
