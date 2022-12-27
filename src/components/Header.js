import React from "react"

export default function({handleClick}){
    return (
        <section className="header-body">
            <div className="header-container">
                <h1>Open Job Listing</h1>
                <button   onClick={handleClick} className="header-button">Post a Job</button>
                 
            </div>
        </section>
    )
}