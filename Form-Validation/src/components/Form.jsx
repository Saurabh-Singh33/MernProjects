import { useState } from "react";
import styles from "./Form.module.css";
import ErrorMessage from "./ErrorMessage";

const Form = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {

    let newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.email)
      newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password)
      newErrors.password = "Password required";
    else if (formData.password.length < 6)
      newErrors.password = "Min 6 characters";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords not match";

    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Invalid phone";

    if (!formData.age || formData.age < 18)
      newErrors.age = "Age must be 18+";

    if (!formData.gender)
      newErrors.gender = "Select gender";

    return newErrors;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {

      alert("Form submitted");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        age: "",
        gender: "",
      });

      setErrors({});

    } else {
      setErrors(validationErrors);
    }
  };

  return (

    <div className={styles.container}>

      <h2 className={styles.heading}>Registration Form</h2>

      <form onSubmit={handleSubmit} className={styles.form}>

        <input className={styles.input} 
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <ErrorMessage error={errors.name} />

        <input className={styles.input} 
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        <ErrorMessage error={errors.email} />

        <input className={styles.input} 
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />
        <ErrorMessage error={errors.password} />

        <input className={styles.input} 
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <ErrorMessage error={errors.confirmPassword} />

        <input className={styles.input} 
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <ErrorMessage error={errors.phone} />

        <input className={styles.input} 
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
        />
        <ErrorMessage error={errors.age} />

        <select  className={styles.select}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <ErrorMessage error={errors.gender} />

        <button type="submit" className={styles.button}>
          Submit
        </button>

      </form>

    </div>
  );
};

export default Form;