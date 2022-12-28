import React from 'react'

export default function({searchForm,handleClick,handleSearchChange}){
     
    return (
        <div className="search-container">
            <select name="type" id="search-select1" value={searchForm.type} onChange={(event) => handleSearchChange(event)}>
    <option value="">Type</option>
    <option value="Full Time">Full Time</option>
    <option value="Contract">Contract</option>
</select>

            <select name="location" id="search-select2" value={searchForm.location} onChange={(event) => handleSearchChange(event)}>
    <option value="">Location</option>
    <option value="Remote">Remote</option>
    <option value="Office">Office</option>
</select>

            <button className="search-button" onClick={handleClick}>Search</button>
            
             
        </div>
    )
}