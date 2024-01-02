import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Form from './component/home/home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Form/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
