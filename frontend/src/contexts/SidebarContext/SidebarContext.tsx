import React, { createContext } from 'react';
import { SidebarContextDTO } from '../../library/DTOs';

export const SidebarContext = createContext<SidebarContextDTO | null>(null);