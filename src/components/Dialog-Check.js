import React from "react"


export default function({job, handleCancelClick}){
    if(!Object.keys(job).length){
        return 
        <> </>
        }
    
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                    <div className="dialog-check-content">
                        
                        <div className="dialog-check-header">
                            <h3>{job.title} @ {job.companyName}</h3>
                            <span className="dialog-cancel" onClick={handleCancelClick}>X</span>
                        </div>
                        
                        <div className="dialog-check-body">
                            <span>Posted on:</span>
                            <span>Job type: {job.type}</span>
                            <span>Job location: {job.location}</span>
                            <p>Job description:</p>
                            <span>Company name: {job.companyName}</span>
                            <span>Company website: {job.companyUrl}</span>
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