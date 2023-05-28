import CompanyCard from './CompanyCard'

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