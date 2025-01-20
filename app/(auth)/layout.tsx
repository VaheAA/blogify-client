import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AuthLayoutProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome to Blogify</h1>
        {children}
      </div>
    </div>
  );
}
