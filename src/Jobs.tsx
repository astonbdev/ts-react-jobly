import {useState, useEffect} from 'react'
import JobsList from "./JobsList";
import JoblyApi from "./api";


/**
 * Logical Component for Job App and child components
 * 
 * props:
 * 
 * state: jobs-
 *            [{ id, title, salary, equity, companyHandle }...]
 * 
 * effects: 
 *     getJobs - requests jobs from api
 * 
 * Routes -> {Jobs, Companies} -> JobsList
 * 
 */

function Jobs(){
    const [jobs, setJobs] = useState<IJob[] | null>(null);

    useEffect(function(){
        async function getJobs(){
            const resp = await JoblyApi.getJobs()
            setJobs(resp);
        }
        getJobs();
        
    }, []);
    console.log("jobs state", jobs);

    if(!jobs) return <p>Loading...</p>;

    return(
        <JobsList jobs={jobs}/>
    )
}

export default Jobs;