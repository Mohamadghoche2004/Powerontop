import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonComponent } from "../../components/ui/Button";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleLogin = async () => {
        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    };
    return <div className="w-full h-full flex justify-center items-center h-screen">
        <div className="w-full lg:w-1/2  h-full flex justify-center lg:justify-start items-center lg:p-20">
            <div className="flex flex-col gap-10 justify-center items-center lg:items-start lg:justify-start">
                <img src="/logo.png" alt="Login" className="w-30 lg:ml-3" />
                <div className="flex flex-col gap-4  justify-center items-center p-5 lg:items-start lg:justify-start">
                    <h1 className="text-2xl lg:text-5xl font-bold">Hello, Welcome Back</h1>
                    <p>Hey there, let's get you logged in</p>
                    <TextField type="email" placeholder="Email" className="w-full" label="Email" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField type="password" placeholder="Password" className="w-full" label="Password" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <ButtonComponent text="Login" className="w-1/2 lg:w-1/3 " color="#9810fa" onClick={handleLogin} />
                    <p>Don't have an account? <Link to="/auth/register" className="text-purple-600">Sign up</Link></p>
                </div>

            </div>
        </div>
        <ImageDiv className="hidden lg:block w-1/2 h-full">
            <h1>Login</h1>
        </ImageDiv>
    </div>;
}


const ImageDiv = styled.div`
    background-image: url('/auth/loginpic.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;