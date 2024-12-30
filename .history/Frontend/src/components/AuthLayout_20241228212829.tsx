 
 
import { useLocation } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import backgroundImage from "../image/photo.avif"
export function AuthLayout() {
  const location = useLocation();

   
  const isSignIn = location.pathname === "/";

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="mb-4 text-center"></div>

          {isSignIn ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>

      
      <div className="hidden lg:block lg:flex-1">
        <img
          src={backgroundImage}
          alt="Abstract background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
