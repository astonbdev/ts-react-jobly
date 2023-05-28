import {Routes, Route} from 'react-router-dom';
import Companies from './Companies';
import CompanyDetail from './CompanyDetail';
import Jobs from './Jobs'

/**
 * Router for Jobly App
 * 
 * props: null
 * state: null
 * 
 * App -> RoutesList -> {Companies, Jobs}
 */
function RoutesList(){
    return(
        <Routes>
            <Route path="/companies" element={<Companies/>}/>
            <Route path="/companies/:handle" element={<CompanyDetail/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
        </Routes>
    )
}

export default RoutesList;