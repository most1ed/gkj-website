import React from 'react';
import { useLocation } from 'react-router-dom';

export function TestComponent() {
  const location = useLocation();

  return (
    <div className="p-4 m-4 border border-primary rounded">
      <h2 className="text-2xl font-bold mb-4">Test Component</h2>
      <p className="text-lg">Current Path: {location.pathname}</p>
    </div>
  );
}
