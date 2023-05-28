import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import CompanyCard from './CompanyCard';
import JoblyApi from './api';
import JobsList from './JobsList';

/**
 * Logical Component for Company App displaying single Company.
 * 
 * props: null
 * 
 * state: companies-
 *          {handle, name, description, numEmployees, logoUrl}
 * 
 * effects: getCompany - fetches info about company parsed from url
 * 
 * Routes -> {Jobs, Companies}
 * 
 */
function CompanyDetail(){
    const [company, setCompany] = useState<(ICompany & IJobs) | null>(null);

    const params = useParams();

    useEffect(function(){
        async function getCompany(){
            if(!params.handle) return;
            const resp = await JoblyApi.getCompany(params.handle);

            setCompany(resp);
        }
        getCompany();
    }, []);

    if(!company) return <p>Loading...</p>;

    return(
        <>
            <CompanyCard company={company} />
            <JobsList jobs={company.jobs} />
        </>
    )
}

export default CompanyDetail;