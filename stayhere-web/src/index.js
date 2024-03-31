import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootswatch/dist/cerulean/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const MyGlobalContext = React.createContext({});

export const MyGlobalProvider = ({ children }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [refreshTime, setRefreshTime] = useState(new Date());
  return (
    <MyGlobalContext.Provider value={{
      checkIn, setCheckIn,
      checkOut, setCheckOut,
      guests, setGuests,
      refreshTime, setRefreshTime
    }}>
      {children}
    </MyGlobalContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyGlobalProvider>
        <App />
      </MyGlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
