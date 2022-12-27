import React from 'react'

export default function({id, title,company,skills,time,location,jobType,handleClick}){
     
    return (
        <section className="job-container" onClick={handleClick}>
            <div className="job-primary-container">
                <h2 className="job-title">{title}</h2>
                <a href="#" className="job-company">{company}</a>
            </div>
            
            <div className="skills-container">
                {skills.map(skill => <span className="job-skill">{skill}</span>)}
                
                
            </div>
            <div className="job-right-section">
                <h5 className="job-attributes">{time} | {location} | {jobType}</h5>
                <a className="job-button">Check</a>
            </div>
              
             
        </section>
    )
}