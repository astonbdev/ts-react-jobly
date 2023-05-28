import CompanyCard from './CompanyCard'

/**
 * Company Card generator component
 * 
 * props: companies-
 *          [{handle, name, description, numEmployees, logoUrl}...]
 * 
 * state: null
 * 
 * Companies -> CompanyList -> CompanyCard
 * 
 */
function CompaniesList({ companies }: {companies: ICompany[]}){
    return(
        <>
            {companies.map(
                (company) => <CompanyCard 
                                key={company.handle} 
                                company={company} />
            )}
        </>
    )
}

export default CompaniesList;