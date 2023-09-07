import React, { Component } from 'react'
import AddEmployee from './AddEmployee'
import axios from 'axios'
export class Employee extends Component {
    constructor(props) {
      super(props)
      this.state = {
         list:[],
         popupbool:false,
         firstName:"",
         lastName:"",
         age:"",
         salary:"",
         id:""
      }
    }
    
componentDidMount(){
axios.get('http://localhost:3000/emp-api')
        .then(res=>{
            this.setState({list:res.data})
        })
        .catch()
    }
deleteEmp=(id)=>{
axios.delete
(`http://localhost:3000/emp-api/${id}`)
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
    alert('Deleted')
    window.location.reload()
}
cancel=(e)=>{
    this.setState({popupbool:false})
    e.preventDefault()
}
showPopup=(id,firstName,lastName,age,salary)=>{
    this.setState({popupbool:true,
        firstName:firstName,
        lastName:lastName,
        age:age,
        salary:salary,
        id:id
    })
    
}
updateEmp=()=>{
const{firstName,lastName,age,salary,id}
=this.state
axios.put
(`http://localhost:3000/emp-api/${id}`,{
        firstName:firstName,
        lastName:lastName,
        age:age,
        salary:salary
    })
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}
  render() {
const{firstName,lastName,age,salary,id}
=this.state
    return (
      <div>
        <AddEmployee/><br></br>
        <table className='emp-table'>
            <thead>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    {this.state.list.map(x=>(<>
        <tr>
                    <td>{x.firstName}</td>
                    <td>{x.lastName}</td>
                    <td>{x.age}</td>
                    <td>{x.salary}</td>
<td><button onClick={
()=>this.showPopup(x._id,x.firstName,
x.lastName,x.age,x.salary)}>Update</button>
<button onClick={
()=>this.deleteEmp(x._id)}>Delete
</button></td>
                </tr>
    </>))}
            </tbody>
        </table>
{this.state.popupbool?<>
<div className='popup'>
<form className='form-update'>
<button className='popup-cancel' 
onClick={this.cancel}>X</button>
<label>FirstName</label>
<input value={firstName} 
onChange={(e)=>this.setState(
{firstName:e.target.value})}/><br></br>
<label>LastNameName</label>
<input value={lastName} onChange={
(e)=>this.setState({lastName:e.target.value}
)}/><br></br>
<label>Age</label>
<input value={age} onChange={
(e)=>this.setState({age:e.target.value})}/>
<br></br>
<label>Salary</label>
<input value={salary} onChange={
(e)=>this.setState({salary:e.target.value})}/>
<br></br>
<button onClick={this.updateEmp}>Update
</button>
</form>
</div>
</>:""}
        <br></br>
      </div>
    )
  }
}

export default Employee
