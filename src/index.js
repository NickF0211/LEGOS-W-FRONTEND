import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import customTheme from './theme';
import { ChakraProvider } from '@chakra-ui/react';
import Compiler from './pages/compiler';
import Info from './pages/info';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Compiler />} />
          <Route path="contact" element={<Info />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
