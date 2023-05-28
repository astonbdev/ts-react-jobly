const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // Remember, the backend needs to be authorized with a token
    // We're providing a token you can use to interact with the backend API
    // DON'T MODIFY THIS TOKEN
    static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4NTE2NzIxN30.rEBjBEhZPROkHYAD71q6rOvu-dCjtJxfIM0kKeJAGt0";

    static async request(endpoint: string, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = new URL(`${BASE_URL}/${endpoint}`);
        const headers = {
            Authorization: `Bearer ${JoblyApi.token}`,
            "Content-Type": "application/json"
        };

        //URLSearchParams constructs key val pairs for us, then we make it a
        //string to add to our URL instance.
        url.search = method === "get"
            ? url.search = new URLSearchParams(data).toString()
            : url.search = "";
        console.log(url.search);

        // set to undefined since the body property cannot exist on a get method
        const body = method !== "get"
            ? JSON.stringify(data)
            : undefined;

        //fetch API does not throw an error, have to dig into the resp for msgs
        const resp = await fetch(url, { method, body, headers });
        console.log("fetch resp", resp);

        if (!resp.ok) {
            console.log("Error", resp);
            console.error("API Error:", resp.statusText, resp.status);
            //TODO: Add error handling and throw something here.
            return;
        }

        return await resp.json()

    }

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username: string) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get companies (filtered by name if not undefined) */

    static async getCompanies(filters: ICompanyFilters): Promise<ICompany[]> {
        let res = await this.request("companies", filters);
        return res.companies;
    }

    /** Get details on a company by handle. */

    static async getCompany(handle: string): Promise<ICompany & IJobs> {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /** Get list of jobs (filtered by title if not undefined) */

    static async getJobs(title: undefined | string = undefined): Promise<IJob[]> {
        const filter = title ? { title } : undefined;

        const res = await this.request("jobs", filter);
        return res.jobs;
    }

    /** Apply to a job */

    static async applyToJob(username: string, id: number) {
        await this.request(`users/${username}/jobs/${id}`, {}, "post");
    }

    /** Get token for login from username, password. */

    static async login(data: ILogin) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site. */

    static async signup(data: IRegister) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile page. */

    static async saveProfile(username: string, data: IUserUpdate) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }
}

export default JoblyApi;
