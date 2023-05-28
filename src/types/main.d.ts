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

/** USER */
interface IUserUpdate {
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string
}