import { useState, useEffect } from "react";
import "./AddStaff.css";

function AddStaff() {
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    gender: "",
    dob: "",
    nic: "",
    staffCategory: "",
    qualifications: "",
    staffID: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    username: "",
    password: "",
    img:"",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChangeHandler = (event) => {
    console.log(event);
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.table(formData);
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nic_regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
    const mobileno_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!values.fName) {
      errors.fName = "Please Enter First Name *";
    }
    if (!values.mName) {
      errors.mName = "Please Enter Middle Name *";
    }
    if (!values.lName) {
      errors.lName = "Please Enter Last Name *";
    }
    if (!values.gender) {
      errors.gender = "Please select Gender *";
    }
    if (!values.dob && values.dob) {
      errors.dob = "Please Enter Date of birth *";
    } else if (!dob_regex.test(values.dob)) {
      errors.dob = "Enter a valid Date of Birth";
    }
    if (!values.nic) {
      errors.nic = "NIC is required *";
    } else if (!nic_regex.test(values.nic)) {
      errors.nic = "Enter a valid NIC";
    }
    if (!values.staffCategory) {
      errors.staffCategory = "Please select Staff Category *";
    }
    if (!values.staffID) {
      errors.staffID = "Please Enter Staff ID *";
    }
    if (!values.email) {
      errors.email = "Email is required *";
    } else if (!email_regex.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    if (!values.mobileNo) {
      errors.mobileNo = "Mobile Number is required *";
    } else if (!mobileno_regex.test(values.mobileNo)) {
      errors.mobileNo = "Enter a valid Mobile Number";
    }
    if (!values.address) {
      errors.address = "Address is required *";
    }
    if (!values.city) {
      errors.city = "City is required *";
    }
    if (!values.username) {
      errors.username = "UserName is required *";
    }
    if (!values.password) {
      errors.password = "Password is required *";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    if (!values.img) {
      errors.img = "Please Upload Staff Member's Image file *";
    }
    return errors;
  };

  return (
    <div className="AddStaffContainer">
      <form className="MainForm" onSubmit={onSubmitHandler}>
        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            First Name :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="fName"
            onChange={onChangeHandler}
            value={formData.fName}
          />
        </div>
        <p>{formErrors.fName}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Middle Name :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="mName"
            onChange={onChangeHandler}
            value={formData.mName}
          />
        </div>
        <p>{formErrors.mName}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Last Name :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="lName"
            onChange={onChangeHandler}
            value={formData.lName}
          />
        </div>
        <p>{formErrors.lName}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Gender :{" "}
          </label>
          <input
            type="radio"
            name="gender"
            className="gender"
            value="Male"
            onChange={onChangeHandler}
          />
          <label for="male">Male</label>
          <input
            type="radio"
            name="gender"
            className="gender"
            value="Female"
            onChange={onChangeHandler}
          />
          <label for="female">Female</label>
        </div>
        <p>{formErrors.gender}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Date Of Birth :{" "}
          </label>
          <input
            type="date"
            className="inputBox"
            name="dob"
            onChange={onChangeHandler}
            value={formData.dob}
          />
        </div>
        <p>{formErrors.dob}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            NIC :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="nic"
            onChange={onChangeHandler}
            value={formData.nic}
          />
        </div>
        <p>{formErrors.nic}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Staff Category :{" "}
          </label>
          <select
            className="selectItems"
            name="staffCategory"
            onChange={onChangeHandler}
            value={formData.staffCategory}
          >
            <option value="" lassName="optionContainer">
              Select Staff Category
            </option>
            <option value="Owner" className="optionContainer">
              Owner
            </option>
            <option value="Member 01" className="optionContainer">
              Member 01
            </option>
            <option value="Member 02" className="optionContainer">
              Member 02
            </option>
            <option value="Member 03" className="optionContainer">
              Member 03
            </option>
          </select>
        </div>
        <p>{formErrors.staffCategory}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Staff ID :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="staffID"
            onChange={onChangeHandler}
            value={formData.staffID}
          />
        </div>
        <p>{formErrors.staffID}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Qualification :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="qualification"
            onChange={onChangeHandler}
            value={formData.qualifications}
          />
        </div>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            E-mail :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
          />
        </div>
        <p>{formErrors.email}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Mobile Number :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="mobileNo"
            onChange={onChangeHandler}
            value={formData.mobileNo}
          />
        </div>
        <p>{formErrors.mobileNo}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Address :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="address"
            onChange={onChangeHandler}
            value={formData.address}
          />
        </div>
        <p>{formErrors.address}</p>

        <div className="inputItems">
          <label htmlFor="City" className="namesTag">
            City :{" "}
          </label>
          <input
            type="text"
            className="inputBox"
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
          />
        </div>
        <p>{formErrors.city}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            User Name :{" "}
          </label>
          <input
            type="text"
            name="username"
            className="inputBox"
            onChange={onChangeHandler}
            value={formData.username}
          />
        </div>
        <p>{formErrors.username}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Password :{" "}
          </label>
          <input
            type="password"
            className="inputBox"
            name="password"
            onChange={onChangeHandler}
            value={formData.password}
          />
        </div>
        <p>{formErrors.password}</p>

        <div className="inputItems">
          <label htmlFor="" className="namesTag">
            Select Image :{" "}
          </label>
          <input
            type="file"
            id="img"
            name="img"
            className="inputBox"
            onChange={onChangeHandler}
            value={formData.img}
            accept="image/*"
          />
          <input type="submit" value="Upload Image" />
        </div>
        <p>{formErrors.img}</p>

        <div className="inputItems">
          <button className="submit" type="submit">
            Add New Staff Member
          </button>
        </div>
      </form>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added Staff Member </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
  );
}

export default AddStaff;
