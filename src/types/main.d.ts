/** AUTH */
interface IRegister {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string
}

interface ILogin {
    username: string,
    password: string
}

/** COMPANIES */
interface ICompany {
    handle: string,
    description: string,
    logoUrl: string,
    name: string,
    numEmployees: number
}

interface ICompanyFilters {
    nameLike?: string,
    minEmployees?: number,
    maxEmployees?: number
}

/** JOBS */
interface IJob {
    id: number,
    title: string,
    salary: number,
    equity: string,
    companyHandle: string
}

/** USER */
interface IUserUpdate {
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string
}