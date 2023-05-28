import {Routes, Route} from 'react-router-dom';
import Companies from './companies/Companies';
import CompanyDetail from './companies/CompanyDetail';
import Jobs from './jobs/Jobs'
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignUpForm';
import UserUpdateForm from './users/UserUpdateForm'

/**
 * Router for Jobly App
 * 
 * props: login -> function to log the user in
 * state: null
 * 
 * App -> RoutesList -> {Companies, Jobs}
 */
function RoutesList({login, signup}: {login:LoginFunc, signup: SignupFunc}){
    return(
        <Routes>
            <Route path="/login" element={<LoginForm login={login}/>}/>
            <Route path="/signup" element={<SignupForm signup={signup}/>}/>
            <Route path="/companies" element={<Companies/>}/>
            <Route path="/companies/:handle" element={<CompanyDetail/>}/>
            <Route path="/profile" element={<UserUpdateForm />}/>
            <Route path="/jobs" element={<Jobs/>}/>
        </Routes>
    )
}

export default RoutesList;