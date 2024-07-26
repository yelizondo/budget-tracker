import React, { createContext } from 'react';
import { AlertPopupContextDTO } from '../../library/DTOs';

export const AlertPopupContext = createContext<AlertPopupContextDTO | null>(null);