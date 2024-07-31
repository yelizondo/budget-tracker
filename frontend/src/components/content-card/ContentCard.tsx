import React, { ReactNode } from 'react';

export const ContentCard: React.FC<{ children: ReactNode }> = ({children}) => {
  return ( 
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg shadow-gray-400 p-6">
        <div className="overflow-x-auto">{children}</div>
      </div>
    </div>
  );
}