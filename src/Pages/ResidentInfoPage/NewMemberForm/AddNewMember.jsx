//import React from 'react'
import { useState } from "react";
import "./AddNewMember.css"

function AddNewMember() {

  const [formData, setFormData] = useState({
    building:'',
    block:'',
    unitCategory:'',
    unit:'',
    fName:'',
    mName:'',
    lName:'',
    gender:'',
    dob: Date,
    nic:'',
    memberType:'',
    email:'',
    mobileNo:'',
    username:'',
    password:''
  })

  const onChangeHandler = (event) => {

    console.log(event)
    setFormData(()=>({
      ...formData,
      [event.target.name]:event.target.value
    }))
  }
  const onSubmitHandler = (event) =>{
    event.preventDefault()
    console.log(formData)
  }

  return (
    <div className='formContainer'>
      <form className='MainForm' onSubmit={onSubmitHandler} >
        <div className="inputItems">
          <label htmlFor="Building" className="namesTag">Building : </label>
          <select className='selectItems' name="building" onChange={onChangeHandler} value={formData.building}>
            <option value="Wing 01" className='optionContainer'>Wing 01</option>
            <option value="Wing 02" className='optionContainer'>Wing 02</option>
            <option value="Wing 03" className='optionContainer'>Wing 03</option>
            <option value="Wing 04" className='optionContainer'>Wing 04</option>
          </select>
        </div>
        <div className="inputItems">
          <label htmlFor="Block"  className="namesTag">Block : </label>
          <select className='selectItems' name="block" onChange={onChangeHandler} value={formData.block}>
            <option value="Block 01" className='optionContainer'>Block 01</option>
            <option value="Block 02" className='optionContainer'>Block 02</option>
            <option value="Block 03" className='optionContainer'>Block 03</option>
            <option value="Block 04" className='optionContainer'>Block 04</option>
          </select>
        </div>
        <div className="inputItems">
          <label htmlFor="unitCategory" className="namesTag">Unit Category : </label>
          <select className='selectItems' name="unitCategory" onChange={onChangeHandler} value={formData.unitCategory}>
            <option value="BR 01" className='optionContainer'>Bed Room 01</option>
            <option value="BR 02" className='optionContainer'>Bed Rooms 02</option>
            <option value="BR 03" className='optionContainer'>Bed Rooms 03</option>
          </select>
        </div>
        <div className="inputItems">
          <label htmlFor="" className="namesTag">Unit : </label>
          <select className='selectItems' name="unit" onChange={onChangeHandler} value={formData.unit}>
            <option value="Unit 01" className='optionContainer'>Unit 01</option>
            <option value="Unit 02" className='optionContainer'>Unit 02</option>
            <option value="Unit 03" className='optionContainer'>Unit 03</option>
            <option value="Unit 04" className='optionContainer'>Unit 04</option>
          </select>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">First Name : </label>
          <input type="text" className="inputBox" name="fName" onChange={onChangeHandler} value={formData.fName} />
        </div>
        <div className="inputItems">
          <label htmlFor="" className="namesTag">Middle Name : </label>
          <input type="text" className="inputBox" name="mName" onChange={onChangeHandler} value={formData.mName} />
        </div>
        <div className="inputItems">
          <label htmlFor="" className="namesTag">Last Name : </label>
          <input type="text" className="inputBox" name="lName" onChange={onChangeHandler} value={formData.lName} />
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">Gender : </label>
          <input type="radio" name='gender'  className='gender' value="Male" onChange={onChangeHandler}/>
          <label for="male">Male</label>
          <input type="radio" name='gender' className='gender' value="Female" onChange={onChangeHandler}/>
          <label for="female">Female</label>  
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">Date Of Birth : </label>
          <input type="date" className="inputBox" name="dob" onChange={onChangeHandler} value={formData.dob}/>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">NIC : </label>
          <input type="text" className="inputBox" name="nic" onChange={onChangeHandler} value={formData.nic}/>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">Member Type : </label>
          <select className='selectItems' name="memberType" onChange={onChangeHandler} value={formData.memberType}>
            <option value="Owner" className='optionContainer'>Owner</option>
            <option value="Member 01" className='optionContainer'>Member 01</option>
            <option value="Member 02" className='optionContainer'>Member 02</option>
            <option value="Member 03" className='optionContainer'>Member 03</option>
          </select>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">E-mail : </label>
          <input type="email" className="inputBox" name="email" onChange={onChangeHandler} value={formData.email}/>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">Mobile Number : </label>
          <input type="text" className="inputBox" name="mobileNo" onChange={onChangeHandler} value={formData.mobileNo}/>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">User Name : </label>
          <input type="text" name="username" className="inputBox" onChange={onChangeHandler} value={formData.username}/>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">Password : </label>
          <input type="password" className="inputBox" name="password" onChange={onChangeHandler} value={formData.password}/>
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">Select Image : </label>
          <input type="file" id="img" name="img" className="inputBox" accept="image/*" />
          <input type="submit" value="Upload Image"/>
        </div>
        <div className="inputItems">
          <button className="submit" type="submit">Add New Member</button>
        </div>
        
      </form>
    </div>
  );
}

export default AddNewMember;