export interface TokenPayload {
    userId: number;
    name: string;
    accessTypes: string[];
    exp?: number;
    iat?: number;
    nbf?: number;
    jti?: number;
  }