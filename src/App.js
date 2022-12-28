import './App.css';
import React from "react"
import Header from "./components/Header"
import Search from "./components/Search-Bar"
import Job from "./components/Job"
import DialogPost from "./components/Dialog-Post"
import DialogCheck from "./components/Dialog-Check"
import dummyData from "./dummyData"
import { db } from './firebase-config'
import { collection, getDocs } from "firebase/firestore"


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
  
  let [jobData, setJobData] = React.useState(dummyData)
  
  let [users, setUsers] = React.useState([])
  
  // const usersCollectionRef = collection()
  // const getUsers = async () => {
    
  // }
  
  // React.useEffect(()=>{
    
  //   getUsers()
  // },[])
  
  
  function handleChange(event){
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
      ...prevFormData, [name]: value
    }))
  }
  
 let arr = []
  function handleJobSubmit(event){
    event.preventDefault()
    arr.push(formData)
    
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
  
  console.log(arr[0])
  
   console.log(showDialogCheck)
   
   
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
   
   function submitSearch(searchForm){
     console.log(searchForm)
     setLoading(true)
     let filter = dummyData.filter(obj => obj.type===searchForm.type || obj.location===searchForm.location)
      
          console.log(filter)
          setLoading(false)
     setJobData(filter)
   }
   
    
  
   function handleSearchChange(event){
    const {name, value, type, checked} = event.target
   setSearchForm(prevData => ({
     ...prevData, [name]: value
   }))
  }

    /*firebase stuff*/
   
    
    const [jobs1, setJobs1] = React.useState([])
    const jobsCollectionRef = collection(db,'jobs')
    React.useEffect(()=>{
      const fetchJobs = async () => {
        const data = await getDocs(jobsCollectionRef) 
        let dataArr = []
      
        data.docs.map(  (doc) => (dataArr.push({ ...doc.data(), id: doc.id })) )
        setJobData(dataArr)
      }

      fetchJobs()
    },[])



    //end of app
   
   
  return (
    <div className="App">
      <DialogCheck job={showDialogCheck} handleCancelClick={()=>setShowDialogCheck({})}/>
      <DialogPost handleCancelClick={()=>clearJobDialogBox()} show={showDialogPost} formData={formData} handleChange={handleChange} handleJobSubmit={handleJobSubmit}/>
      <Header handleClick={()=>setShowDialogPost(prevState => !prevState)}/>
      <Search searchForm={searchForm} handleClick={()=>submitSearch(searchForm)} handleSearchChange={handleSearchChange}/>
      {console.log(dummyData)}



      {jobData.map(jobObject => {
      
      return <Job key={jobObject.id} id={jobObject.id} title={jobObject.title} company={jobObject.companyName} skills={jobObject.skills} time="Today" location={jobObject.location} jobType={jobObject.type} handleClick={()=>setShowDialogCheck(jobObject)}/>
      })}

    </div>
  );
}

export default App;
