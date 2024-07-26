import React, { createContext } from 'react';
import { SpinnerContextDTO } from '../../library/DTOs';

export const SpinnerContext = createContext<SpinnerContextDTO | null>(null);