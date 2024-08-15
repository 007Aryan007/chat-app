import Background from "@/assets/login2.png"
import Victory from "@/assets/victory.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from 'react';
import {toast} from "sonner";
import apiClient from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants"
import { LOGIN_ROUTE } from "@/utils/constants"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = ()=>{
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    if(password!==confirmPassword){
      toast.error("Password and confirm Password should be same");
      return false;
    }
    return true;
  }
  const validateLogin = ()=>{
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    return true;
  }
  const handleLogin = async()=>{
    if(validateLogin()){
      const response = await apiClient.post(
        LOGIN_ROUTE,
        {email, password},
        {withCredentials: true}
      );
      if(response.data.user.id){
        if(response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log(response);
    }
  };
  const handleSignup = async()=>{
    if(validateSignup()){
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        {email, password},
        {withCredentials: true}
      );
      if(response.status===201){
        navigate("/profile");
      }
      console.log(response);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className=" h-[80vh] w-[80vw] items-center justify-center border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className=" flex flex-col gap-10 items-center justify-center">
          <div className=" flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory image" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">Fill in the details to get started with the best chat app</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent w-full rounded-none">
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">Login</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Signup</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col mt-10 gap-5">
                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e=>setEmail(e.target.value)}></Input>
                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e=>setPassword(e.target.value)}></Input>
                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent value="signup"className="flex flex-col gap-5">
                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e=>setEmail(e.target.value)}></Input>
                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e=>setPassword(e.target.value)}></Input>
                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></Input>
                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="h-full w-full hidden xl:flex justify-center items-center">
          <img src={Background} alt="login image" className="h-[80%] w-[80%]"/>
        </div>
      </div>
    </div>
  )
}

export default Auth;
