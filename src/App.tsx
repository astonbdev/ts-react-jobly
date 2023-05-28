import './App.css';
import JoblyApi from './helpers/api.ts';
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './RoutesList.tsx';

/**
 * props:
 * 
 * state:
 * 
 * App -> RoutesList
 * 
 */
function App() {

  return (
    <>
      <BrowserRouter>
        <RoutesList />
      </BrowserRouter>
    </>
  );
}

export default App;
