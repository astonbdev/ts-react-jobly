import { useState, useEffect, createContext } from 'react'
import { BrowserRouter } from 'react-router-dom';
import decode from "jwt-decode"
import JoblyApi from './helpers/api.ts';
import RoutesList from './RoutesList.tsx';
import useLocalStorage from './hooks/useLocalStorage.ts';
import UserContext from './auth/UserContext.tsx';

const TOKEN_STORAGE_ID = "joblyToken"

/**
 * props:
 * 
 * state:
 * user - { username, firstName, lastName, isAdmin, jobs, isLoading}
 * token - jwt token saved in local storage
 * 
 * effects:
 * 
 * 
 * App -> RoutesList
 * 
 */
const initialUser = {data: null, isLoading: true}
function App() {
  const [user, setUser] = useState<{data:IUser | null, isLoading: boolean}>(initialUser);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function getUser(){
    if(typeof token === "string"){
      JoblyApi.token = token;

      const { username }: IUser = decode(token);
      fetchUser(username)
    }
    else{
      setUser({
        data: null,
        isLoading: false,
      })
    }

    async function fetchUser(username:string){
      const currUser = await JoblyApi.getCurrentUser(username);
      setUser({data:{...currUser}, isLoading: false});
    }

  }, [token])



  //logs in user, setting token and user state
  async function login(credentials: ILogin){
    const userToken = await JoblyApi.login(credentials);
    setToken(userToken);
    // console.log("login resp", user);
  }

  //registers user, setting token and user state
  async function signup(credentials: IRegister){
    const userToken = await JoblyApi.signup(credentials);
    setToken(userToken);
    // console.log("signup resp", user);
  }

  if(user.isLoading){
    return <p>Loading...</p>
  }

  return (
    <>
    <UserContext.Provider value={{
      currentUser: user.data,
      setUser: setUser
    }}>
      <BrowserRouter>
        <RoutesList login={login} signup={signup}/>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;
