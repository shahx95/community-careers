import './App.css';
import React from "react"
import Header from "./components/Header"
import Search from "./components/Search-Bar"
import Job from "./components/Job"
import dummyData from "./dummyData"


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
   
  return (
    <div className="App">
      <Header />
      <Search />
      {console.log(dummyData)}



      {dummyData.map(jobObject => {
      
      return <Job key={jobObject.id} id={jobObject.id} title={jobObject.title} company={jobObject.companyName} skills={jobObject.skills} time="Today" location={jobObject.location} jobType={jobObject.type}/>
      })}

    </div>
  );
}

export default App;
