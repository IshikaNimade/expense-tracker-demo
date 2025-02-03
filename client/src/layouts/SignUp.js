import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert } from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Email as EmailIcon } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(formData);
      setSuccess("Registration successful! Redirecting to authentication...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <>
        <CustomTextField
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          icon={<PersonIcon />}
        />
        <CustomTextField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<EmailIcon />}
        />
        <CustomTextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={<LockIcon />}
        />
        <CustomButton type="submit" variant="contained">
          Sign Up
        </CustomButton>
      </>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
}

export default Signup;
