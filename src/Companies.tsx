import { useState, useEffect } from "react";
import CompaniesList from "./CompaniesList";
import JoblyApi from "./api";

/**
 * props:
 * 
 * state:
 * 
 * Routes -> {Jobs, Companies}
 * 
 */

function Companies(){
    const [companies, setCompanies] = useState<ICompany[] | null>(null)

    useEffect(function(){
        async function getCompanies(){
            const resp = await JoblyApi.getCompanies({});

            setCompanies(() => resp);
        }
        getCompanies();
    }, []);
    console.log("companies state", companies);

    //Use loading presentation until data fetched
    if(!companies) return <div>Loading...</div>

    return(
        <CompaniesList companies={companies}/>
    )
}

export default Companies;