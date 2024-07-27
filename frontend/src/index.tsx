import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider, AlertPopupContextProvider, SpinnerContextProvider } from './contexts';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SpinnerContextProvider>
        <AuthContextProvider>
          <AlertPopupContextProvider>
            <App />
          </AlertPopupContextProvider>
        </AuthContextProvider>
      </SpinnerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
