import {Routes, Route} from 'react-router-dom';
import Companies from './companies/Companies';
import CompanyDetail from './companies/CompanyDetail';
import Jobs from './jobs/Jobs'

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