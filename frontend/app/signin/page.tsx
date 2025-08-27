import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from "axios"
import { BACKEND_URL } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SignInProps {
  onToggle: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    const router=useRouter()
    e.preventDefault();
    console.log('Sign in attempted with:', formData);
    let respose=await axios.post(`${BACKEND_URL}/user/signin`,{
        username:formData.email,
        password:formData.password
    })
    localStorage.setItem("token",respose?.data?.jwt)
    router.push("/dashboard")
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-800/30 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-11 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onToggle}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;