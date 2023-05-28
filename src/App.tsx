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

  async function login(credentials: ILogin){
    const user = await JoblyApi.login(credentials);
    console.log("login resp", user);
  }

  async function signup(credentials: IRegister){
    const user = await JoblyApi.signup(credentials);
    console.log("signup resp", user);

  }

  return (
    <>
      <BrowserRouter>
        <RoutesList login={login} signup={signup}/>
      </BrowserRouter>
    </>
  );
}

export default App;
