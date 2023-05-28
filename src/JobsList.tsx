import JobCard from './JobCard'

/**
 * Job Card generator component
 * 
 * props: job-
 *          [{ id, title, salary, equity, companyHandle }...]
 * 
 * state: null
 * 
 * Jobs -> JobList -> JobCard
 * 
 */
function JobsList({jobs}: {jobs:IJob[]}){
    return(
        <>
            {jobs.map(
                (job) => <JobCard 
                                key={job.id} 
                                job={job} />
            )}
        </>
    )

}

export default JobsList;