import { Request, Response, NextFunction } from 'express';
import { generateToken, validateToken } from '../library/utils';
import { GenerateTokenResult, TokenPayload } from '../library/interfaces';
import config from '../config/config';

/**
 * middleware to check whether user has access to a specific endpoint 
 * 
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) {
        console.error('Invalid token');
        return res.status(401).json({ message: 'Invalid token' });
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    const decodedToken = await validateToken(jwt);

    const hasAccessToEndpoint = allowedAccessTypes.some(
      (at) => decodedToken.accessTypes.some((uat) => uat === at)
    );

    if (!hasAccessToEndpoint) {
        console.error('No enough privileges to access endpoint');
        return res.status(401).json({ message: 'No enough privileges to access endpoint' });
    }

    next();
  } catch (error:any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Expired token' });
        console.error('Expired token');
      return;
    }
    console.error('Auth Error');
    console.error(error);
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};

/**
 * middleware to refresh a token
 * 
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const refreshAuthToken = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    // Verify request has token
    if (!jwt) {
        console.error('Invalid token');
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // Verify token hasn't expired yet
    const decodedToken: TokenPayload = await validateToken(jwt);

    delete decodedToken.exp;
    delete decodedToken.iat;
    delete decodedToken.exp;
    delete decodedToken.nbf;
    delete decodedToken.jti;

    const newToken: GenerateTokenResult = generateToken(decodedToken);

    return res.status(200).json({
      code: 1,
      message: 'Success',
      result: {
        token: newToken.token,
        expiresIn: newToken.exp
      }
    });

  } catch (error:any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Expired token' });
        console.error('TokenExpiredError: Token expired at: ' + error.expiredAt);
      return;
    }
    console.error('Auth Error');
    console.error(error);
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};