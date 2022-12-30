import React from "react"


export default function({job, handleCancelClick}){
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
     
    
    if(!Object.keys(job).length){
        return 
        <> </>
        }
    
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                    <div className="dialog-check-content">
                        
                        <div className="dialog-check-header">
                            <h3>{job.title} @ <a className="job-check-title-anchor" href={job.companyUrl}>{job.companyName}</a></h3>
                            <span className="dialog-cancel" onClick={handleCancelClick}>X</span>
                        </div>
                        
                        <div className="dialog-check-body">
                            <div><span className="job-check-attribute">Posted on: </span><span>{`${monthNames[job.postedOn.getMonth()]} ${job.postedOn.getDate()} ${job.postedOn.getFullYear()}`}</span></div>
                            <div> <span className="job-check-attribute">Job type: </span> <span>{job.type}</span></div>    
                            <div> <span className="job-check-attribute">Job location: </span> <span>{job.location}</span></div>    
                            <div> <span className="job-check-attribute">Job description: </span> <span>{job.description}</span></div>    
                                
                            
                            <span>Skills:</span>
                            <div className="dialog-check-skills">
                               {job.skills.map(skill => <span className="job-skill">{skill}</span>)} 
                            </div>  
                        </div>
                        
                    </div>
                    
                
                 
            </div>
            
        </div>
    )
}