import React, { createContext } from 'react';
import { AuthContextDTO } from '../../library/DTOs';

export const AuthContext = createContext<AuthContextDTO | null>(null);