import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
