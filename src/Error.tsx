/**
 * Generic Error Component
 * 
 * props: err
 * 
 * API ERROR -> Error
 */
function Error({err}: {err:IErrorAPI}){
    console.log("ErrorCard", err, "end");
    return (
        <div>{err.status}:{err.message}</div>
    )
}

export default Error;