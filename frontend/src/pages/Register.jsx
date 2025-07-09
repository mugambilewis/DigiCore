import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice'; // ✅ Adjust if path is different

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' }
  ];

  const getPasswordValidation = (password) =>
    passwordRequirements.map(req => ({ ...req, met: req.regex.test(password) }));

  const passwordValidation = getPasswordValidation(formData.password);
  const allPasswordRequirementsMet = passwordValidation.every(req => req.met);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!passwordsMatch) return setError("Passwords do not match");

    try {
      setLoading(true);
      const res = await axios.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      dispatch(loginSuccess(res.data.user)); // ✅ Save user to Redux
      navigate('/dashboard'); // ✅ Redirect
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DigiCore</h1>
          <p className="text-gray-600">Join the premium electronics experience</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/20 p-8 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Start your premium shopping journey</p>
          </div>

          {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <InputField
              id="name"
              icon={<User />}
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            {/* Email */}
            <InputField
              id="email"
              icon={<Mail />}
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            {/* Password */}
            <PasswordField
              id="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
              requirements={passwordValidation}
            />

            {/* Confirm Password */}
            <PasswordField
              id="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              show={showConfirmPassword}
              toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              isConfirm={true}
              passwordsMatch={passwordsMatch}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={!allPasswordRequirementsMet || !passwordsMatch || loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center">
                {loading ? 'Creating...' : 'Create Account'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">Join 10,000+ satisfied customers</p>
          <div className="flex justify-center items-center mt-2 space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Input Field
const InputField = ({ id, label, icon, ...props }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
      <input
        id={id}
        {...props}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
      />
    </div>
  </div>
);

// ✅ Reusable Password Field
const PasswordField = ({ id, label, value, onChange, show, toggleShow, requirements = [], isConfirm, passwordsMatch }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type={show ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={onChange}
        required
        className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isConfirm && value && !passwordsMatch ? 'border-red-300' : 'border-gray-200'
        }`}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>

    {/* Show password requirements */}
    {!isConfirm && value && (
      <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
        <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
        {requirements.map((req, i) => (
          <div key={i} className="flex items-center space-x-2">
            {req.met ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-400" />}
            <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>{req.text}</span>
          </div>
        ))}
      </div>
    )}

    {/* Show password match info */}
    {isConfirm && value && !passwordsMatch && (
      <p className="text-sm text-red-600 flex items-center"><X className="h-4 w-4 mr-1" /> Passwords do not match</p>
    )}
    {isConfirm && passwordsMatch && (
      <p className="text-sm text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" /> Passwords match</p>
    )}
  </div>
);

export default Register;
