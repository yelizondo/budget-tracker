import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { GenerateTokenResult, TokenPayload } from '../interfaces';
import config from '../../config/config';

/**
 * generates JWT used for local testing
 */
export function generateToken(payload:TokenPayload): GenerateTokenResult {

  // Read private key value
  const privateKey = fs.readFileSync(path.join(__dirname, './../../private.key'));

  const expiratationTime = Math.floor(new Date().getTime() / 1000) + config.jwt.expiresInSeconds;

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key 
    // to generate the JWT. The client gets a public key to validate the 
    // signature
    algorithm: 'RS256',
    expiresIn: expiratationTime
  };

  // Generate JWT
  return {
    token: sign(payload, privateKey, signInOptions),
    exp: expiratationTime
   };
};

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'));

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error:any, decoded: TokenPayload | any) => {
      if (error) return reject(error);

      resolve(decoded);
    })
  });
}