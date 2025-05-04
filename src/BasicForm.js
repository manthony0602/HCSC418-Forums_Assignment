// BasicForm.js
import React, { useState } from 'react';
import './App.css';

const BasicForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [names, setNames] = useState([]);

  const validate = (field, value) => {
    let error = '';
    switch (field) {
      case 'name':
        error = value.trim() === '' ? 'Name is required' : '';
        break;
      case 'email':
        error = /^\S+@\S+\.\S+$/.test(value)
          ? ''
          : 'Please enter a valid email address (e.g. name@example.com)';
        break;
      case 'phone':
        error = /^\d{10}$/.test(value)
          ? ''
          : 'Phone number must be exactly 10 digits (no dashes or spaces)';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const sanitizedValue = name === 'phone' ? value.replace(/\D/g, '') : value;

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    const error = validate(name, sanitizedValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([field, value]) => {
      const error = validate(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      setNames((prev) => [...prev, formData]);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container" noValidate>
      <div className="input-group">
        <input
          id="name"
          name="name"
          placeholder=" "
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
        />
        <label htmlFor="name">Full Name</label>
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="input-group">
        <input
          id="email"
          name="email"
          type="email"
          placeholder=" "
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
          autoComplete="email"
        />
        <label htmlFor="email">Email Address</label>
        <small className="helper-text">We'll never share your email.</small>
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="input-group">
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder=" "
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'input-error' : ''}
          inputMode="numeric"
          maxLength="10"
        />
        <label htmlFor="phone">Phone Number</label>
        <small className="helper-text">
          Enter 10 digits only. No dashes or spaces.
        </small>
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>

      {names.length > 0 && (
        <div className="success-message">
          🎉 Thank you! Your info has been submitted.
        </div>
      )}

      <div className="list-section">
        <h3>Submitted Entries</h3>
        <ul>
          {names.map((user, idx) => (
            <li key={idx}>
              {user.name} | {user.email} | {user.phone}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default BasicForm;
