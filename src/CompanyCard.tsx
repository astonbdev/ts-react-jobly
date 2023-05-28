function CompanyCard({company}: {company: ICompany}){
    return(
        <div className="CompanyCard">
            <h5>{company.name}</h5>
            <p>{company.description}</p>
            <p>Number of Employees: {company.numEmployees}</p>
        </div>
    )
}

export default CompanyCard;