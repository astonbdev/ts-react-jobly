import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import decode from "jwt-decode"
import JoblyApi from './helpers/api.ts';
import RoutesList from './RoutesList.tsx';
import useLocalStorage from './hooks/useLocalStorage.ts';

const TOKEN_STORAGE_ID = "joblyToken"

/**
 * props:
 * 
 * state:
 * 
 * App -> RoutesList
 * 
 */
const initialUser = {isLoading: true}
function App() {
  const [user, setUser] = useState<IUser & {isLoading: boolean} | {isLoading: boolean}>(initialUser);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function(){
    if(typeof token === "string"){
      JoblyApi.token = token;

      const { username }: IUser = decode(token);
      getUser(username)
    }
    else{
      setUser({
        isLoading: false,
      })
    }

    async function getUser(username:string){
      const currUser = await JoblyApi.getCurrentUser(username);
      setUser({...currUser, isLoading: false});
    }

  }, [token])



  //logs in user, setting token and user state
  async function login(credentials: ILogin){
    const user = await JoblyApi.login(credentials);
    console.log("login resp", user);
  }

  //registers user, setting token and user state
  async function signup(credentials: IRegister){
    const user = await JoblyApi.signup(credentials);
    console.log("signup resp", user);

  }

  if(user && user.loading){
    return <p>Loading...</p>
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
