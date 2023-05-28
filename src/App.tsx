import './App.css';
import JoblyApi from './api.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Companies from './Companies.tsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/companies" element={<Companies/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
