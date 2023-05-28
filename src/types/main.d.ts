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

interface IJobs {
    jobs: IJob[]
}

/** USER */
interface IUser {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean,
    jobs: IJob[]
}
interface IUserUpdate {
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string
}
interface IUserContext {
    currentUser?: IUser | null,
    setUser?: SetUserFunc
}

/** ERROR */

interface IErrorAPI {
    message: string,
    status: number
}

//Helpers
type InputElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

//Function Types
type LoginFunc = (credentials: ILogin) => void;
type SignupFunc = (credentials: IRegister) => void;
type SetUserFunc = React.Dispatch<SetStateAction<{ data: IUser, isLoading: boolean } | null>>
