import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonComponent } from "../../components/ui/Button";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/auth.service";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    try {
      const user = await login({ email, password });
      if (user.role !== "admin") {
        authService.logout();
        setError("Access denied. Admin credentials required.");
        return;
      }
      navigate("/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data
          ?.error ||
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center h-screen">
      <div className="w-full lg:w-1/2 h-full flex justify-center lg:justify-start items-center lg:p-20">
        <div className="flex flex-col gap-10 justify-center items-center lg:items-start lg:justify-start">
          <img src="/logo.png" alt="PowerOnTop" className="w-30 lg:ml-3" />
          <div className="flex flex-col gap-4 justify-center items-center p-5 lg:items-start lg:justify-start">
            <h1 className="text-2xl lg:text-5xl font-bold">Admin Login</h1>
            <p>Sign in to manage the store dashboard</p>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <TextField
              type="email"
              label="Email"
              size="small"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              size="small"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonComponent
              text="Login"
              className="w-1/2 lg:w-1/3"
              color="#9810fa"
              onClick={handleLogin}
            />
            <p>
              <Link to="/" className="text-purple-600">
                Back to store
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ImageDiv className="hidden lg:block w-1/2 h-full" />
    </div>
  );
}

const ImageDiv = styled.div`
  background-image: url("/auth/loginpic.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
