/**
 * Pres component for a Job
 * 
 * props: job-
 *          { id, title, salary, equity, companyHandle }
 * 
 * state: null
 * 
 * JobsList -> JobCard
 * 
 */

function JobCard({job}: {job: IJob}){
    return(
        <div className="Job">
            <h5>{job.title}</h5>
        </div>
    )
}
export default JobCard;