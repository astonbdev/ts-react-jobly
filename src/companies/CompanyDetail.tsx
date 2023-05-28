import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import CompanyCard from './CompanyCard';
import ErrorCard from '../helpers/Error'
import JoblyApi from '../helpers/api';
import JobsList from '../jobs/JobsList';

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
    const [errors, setErrors] = useState<IErrorAPI[] | null>(null);

    const params = useParams();

    useEffect(function(){
        async function getCompany(){
            //Typescript guard
            if(!params.handle) return;

            let resp;

            try{
                resp = await JoblyApi.getCompany(params.handle);
            }
            catch(errs){
                if(errs instanceof Array){
                    setErrors(errs);
                    return;
                }                    
                //if it's not the error we are expecting, throw it for debugging
                throw errs
            }
            
            //Everything is fine, proceed
            setCompany(resp);
        }
        getCompany();
    }, []);

    if(errors) return (
        <>
        {errors.map((err)=>(<ErrorCard err={err} / >))}
        </>)
    if(!company) return <p>Loading...</p>;

    return(
        <>
            <CompanyCard company={company} />
            <JobsList jobs={company.jobs} />
        </>
    )
}

export default CompanyDetail;