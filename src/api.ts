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

        url.search = method === "get"
            ? url.search = new URLSearchParams(data).toString()
            : url.search = "";

        const body = method !== "get"
            ? JSON.stringify(data)
            : undefined


        const resp = await fetch(url, { method, body, headers });

        if (!resp.ok) {
            console.log("Error", resp);
            console.error("API Error:", resp.statusText, resp.status);
            // const jsonResp = await resp.json()
            // console.log("jsonresp", jsonResp)
            // let message = `API Error: ${resp.statusText} ${resp.status}`;
            // throw Array.isArray(message) ? message : [message];
        }

        return await resp.json()

    }

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get companies (filtered by name if not undefined) */

    static async getCompanies(filters) {
        let res = await this.request("companies", filters);
        return res.companies;
    }

    /** Get details on a company by handle. */

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /** Get list of jobs (filtered by title if not undefined) */

    static async getJobs(title) {
        let res = await this.request("jobs", { title });
        return res.jobs;
    }

    /** Apply to a job */

    static async applyToJob(username, id) {
        await this.request(`users/${username}/jobs/${id}`, {}, "post");
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site. */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile page. */

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }
}

export default JoblyApi;
