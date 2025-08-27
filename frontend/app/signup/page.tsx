import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/utils';
import axios from 'axios';

interface SignUpProps {
  onToggle: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign up attempted with:', formData);
    const router=useRouter()
    e.preventDefault();
    console.log('Sign in attempted with:', formData);
    let respose=await axios.post(`${BACKEND_URL}/user/signup`,{
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
            Create Account
          </h2>
          <p className="text-gray-400 mt-2">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                 Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="First name"
                  required
                />
              </div>
            </div>
          </div>

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
                placeholder="Create a password"
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

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-11 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-800"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
              I agree to the{' '}
              <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Privacy Policy
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onToggle}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;