import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Checkbox } from '../components/FormInput';
import Button from '../components/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-sidebar" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mb-6">
            <span className="text-white font-bold text-lg">HF</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">HajjFlow Ghana</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-md">
            Enterprise Hajj management for agencies across Ghana — from Accra to Tamale, managing pilgrims nationwide.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            {[
              { label: 'Pilgrims Managed', value: '3,500+' },
              { label: 'Agencies in Ghana', value: '45+' },
              { label: 'Documents Verified', value: '12,000+' },
              { label: 'Regions Covered', value: '16' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold">HF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">HajjFlow Ghana</h1>
              <p className="text-xs text-slate-500">Hajj Management Platform</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="admin@hajjflow.com.gh"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" />
              <a href="#" className="text-sm text-primary-700 hover:text-primary-800 font-medium">
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Sign in
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            HajjFlow Ghana v1.0 — Licensed Hajj Agency Management
          </p>
          <p className="text-center text-sm text-slate-500 mt-4">
            Applying for Hajj?{' '}
            <a href="/portal/register" className="text-primary-700 font-medium hover:text-primary-800">
              Register here
            </a>
            {' '}or{' '}
            <a href="/portal/login" className="text-primary-700 font-medium hover:text-primary-800">
              pilgrim login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
