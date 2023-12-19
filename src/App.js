import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Form from './component/form';
import FormDataDisplay from './component/display';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Form/>} />
        <Route path="/display" element={<FormDataDisplay/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
