import './App.css';
import React from "react"
import Header from "./components/Header"
import Search from "./components/Search-Bar"
import Job from "./components/Job"
import DialogPost from "./components/Dialog-Post"
import DialogCheck from "./components/Dialog-Check"
import dummyData from "./dummyData"
import { db } from './firebase-config'
import { collection, query, where, orderBy, getDocs, addDoc, serverTimestamp } from "firebase/firestore"


function App() {
  let skillsArr = ["Java","React","Python","AWS","C++"]
  
  let [showDialogPost, setShowDialogPost] = React.useState(false)
  
  let [showDialogCheck, setShowDialogCheck] = React.useState({})
  
  let [loading, setLoading] = React.useState(true)
  
  let [searchForm, setSearchForm] = React.useState({
    type: "",
    location: ""
  })
  
  let [formData, setFormData] = React.useState({
    jobTitle: "",
    type: "",
    location: "",
    companyName: "",
    companyUrl: "",
    jobLink: "",
    jobDescription: "",
    jobSkills: ""
  })
  
  let [showReset,setShowReset] = React.useState(false)

  let [jobData, setJobData] = React.useState([])
  
  let [users, setUsers] = React.useState([])
  
  // const usersCollectionRef = collection()
  // const getUsers = async () => {
    
  // }
  
  // React.useEffect(()=>{
    
  //   getUsers()
  // },[])
  
  /*firebase stuff*/
   
    
  const [jobs1, setJobs1] = React.useState([])
  const jobsCollectionRef = collection(db,'jobs') 
  
  const fetchJobs = async () => {
       
    const data = await getDocs(query(jobsCollectionRef, orderBy("postedOn","desc"))) 
    let dataArr = data.docs.map(  (doc) => ({ ...doc.data(), id: doc.id, postedOn: new Date(doc.data().postedOn.toDate()) }) )
    //Math.floor((new Date() - new Date(doc.data().postedOn.toDate()))/86400000) }) )
    console.log(dataArr)
    setJobData(dataArr)
    setSearchForm({
      type: "",
      location: ""
    })
    setShowReset(false)
  }


  React.useEffect(()=>{
   
    
    fetchJobs()

    setLoading(false)
     
  },[])

  const createJob = async(jobData) => {
    const skillsArray = jobData.jobSkills.split(",").map(skill => skill.trim())
    console.log("Creating job now")

    // {
    //   jobTitle: "",
    //   type: "",
    //   location: "",
    //   companyName: "",
    //   companyUrl: "",
    //   jobLink: "",
    //   jobDescription: "",
    //   jobSkills: ""
    // }
 
    //TODO: add support for job description
    await addDoc(jobsCollectionRef, {description: jobData.jobDescription, link: jobData.jobLink, companyUrl: jobData.companyUrl, location: jobData.location, companyName: jobData.companyName, title: jobData.jobTitle, type: jobData.type, skills: skillsArray, postedOn: serverTimestamp() })
    fetchJobs()
    setShowDialogPost(false)
    
  }

  /*end of firebase stuff */


  function handleChange(event){
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
      ...prevFormData, [name]: value
    }))
  }
  
  
  function handleJobSubmit(event){
    event.preventDefault()
     
    
    createJob(formData)
    //validate form inputs
    //add to database
    setFormData({
    jobTitle: "",
    type: "",
    location: "",
    companyName: "",
    companyUrl: "",
    jobLink: "",
    jobDescription: "",
    jobSkills: ""
  })
  }
  
   
  
   
   
   
   function clearJobDialogBox(){
     setShowDialogPost(false)
     setFormData({
        jobTitle: "",
        type: "",
        location: "",
        companyName: "",
        companyUrl: "",
        jobLink: "",
        jobDescription: "",
        jobSkills: ""
     })
   }
    
   async function submitSearch(searchForm){
     console.log(searchForm)
     let q = ""
     if(searchForm.location && searchForm.type){
       q = query(jobsCollectionRef, where("location","==",searchForm.location),where("type","==",searchForm.type))

     }
     else if(searchForm.location){
      q = query(jobsCollectionRef, where("location","==",searchForm.location))
    }
     else if(searchForm.type){
       q = query(jobsCollectionRef, where("type","==",searchForm.type))
     }
     else return 

     
     const filteredJobs = await getDocs(q)
     console.log(filteredJobs.docs)
     setShowReset(true) 
          
     setJobData(filteredJobs.docs.map(  (doc) => ({ ...doc.data(), id: doc.id, postedOn: new Date(doc.data().postedOn.toDate()) }) ))
   }
   
    
  
   function handleSearchChange(event){
    const {name, value, type, checked} = event.target
   setSearchForm(prevData => ({
     ...prevData, [name]: value
   }))
  }

    

    // console.log(`loading status: ${loading}`)

    //end of app
   
   
  return (
    <div className="App">
      <DialogCheck job={showDialogCheck} handleCancelClick={()=>setShowDialogCheck({})}/>
      <DialogPost handleCancelClick={()=>clearJobDialogBox()} show={showDialogPost} formData={formData} handleChange={handleChange} handleJobSubmit={handleJobSubmit}/>
      <Header handleClick={()=>setShowDialogPost(prevState => !prevState)}/>
      <Search searchForm={searchForm} handleClick={()=>submitSearch(searchForm)} handleSearchChange={handleSearchChange}/>
      
      {showReset && <div className='reset-search-container'><span className='reset-search-button' onClick={fetchJobs}>x Reset Search</span></div>}

      {
      jobData.length === 0 ? 
      <div className="loader-container"><span className="loader"></span></div> : 
      jobData.map(jobObject => {
      
        return <Job key={jobObject.id} id={jobObject.id} title={jobObject.title} company={jobObject.companyName} skills={jobObject.skills} time={jobObject.postedOn} location={jobObject.location} jobType={jobObject.type} handleClick={()=>setShowDialogCheck(jobObject)}/>
        })
    }
      
     

      
      
    </div>
  );
}

export default App;
