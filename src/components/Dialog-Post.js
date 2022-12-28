import React from "react"

export default function ({handleCancelClick, show, formData, handleChange, handleJobSubmit}){
    if(!show){
        return(
            <></>
        )
    }
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <form className="dialog-form" onSubmit={(event) => handleJobSubmit(event)}>
                    <div className="dialog-content">
                        <div className="dialog-header">
                            <h2>Post a Job</h2>
                            <span className="dialog-cancel" onClick={handleCancelClick}>X</span>
                        </div>
                        <span style={{fontSize:"small",color:"#bc7d81"}}>* Required</span>
                        <div className="dialog-sections">
                            <div className="dialog-container">
                                <input type="text" name="jobTitle" placeholder="Job Title *" value={formData.jobTitle} onChange={(event) => handleChange(event)}/>
                            <select name="type" id="select-type" value={formData.type} onChange={(event) => handleChange(event)}>
                                <option value="">Type *</option>
                                <option value="fulltime">Full Time</option>
                                <option value="contract">Contract</option>
                            </select>
                            </div>
                            <div className="dialog-container">
                                <select name="location" id="select-location" value={formData.location} onChange={(event) => handleChange(event)}>
                                <option value="">Location *</option>
                                <option value="remote">Remote</option>
                                <option value="onsite">Onsite</option>
                            </select>
                            <input type="text" name="companyName" placeholder="Company Name *" value={formData.companyName} onChange={(event) => handleChange(event)}/>
                            </div>
                            <div className="dialog-container">
                                <input type="text" name="companyUrl" placeholder="Company Website *" value={formData.companyUrl} onChange={handleChange}/>
                                <input type="text" name="jobLink" placeholder="Job Link" value={formData.jobLink} onChange={(event) => handleChange(event)}/>
                            
                            </div>
                            <div className="dialog-container">
                            <input className="job-description" type="text" name="jobDescription" placeholder="Job Description *" value={formData.jobDescription} onChange={(event) => handleChange(event)}/>
                            </div>
                            <div className="dialog-container">
                                <input className="job-description" type="text" name="jobSkills" placeholder="Comma separated skills e.g. node, AWS, SQL, php... *" value={formData.jobSkills} onChange={(event) => handleChange(event)}/>
                            </div>
                        </div>
                    </div>
                    <div className="dialog-footer">
                        
                            <button className="dialog-submit-btn">Submit</button>
                        
                    </div>
                
                </form>
            </div>
            
        </div>
    )
}