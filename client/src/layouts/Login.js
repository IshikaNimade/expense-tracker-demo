import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert } from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Email as EmailIcon } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.token);
      setSuccess("Login successful! Redirecting to dashboard...");

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <>
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
          Sign In
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

export default Login;
