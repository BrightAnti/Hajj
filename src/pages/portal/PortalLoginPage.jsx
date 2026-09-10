import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/FormInput';
import Button from '../../components/Button';
import { usePortalAuth } from '../../context/PortalAuthContext';

export default function PortalLoginPage() {
  const navigate = useNavigate();
  const { login } = usePortalAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(phoneOrEmail);
    if (result.success) {
      navigate('/portal/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">HF</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Pilgrim Portal</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to track your Hajj application</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Phone number or email"
                placeholder="+233 20 234 5678"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                error={error}
              />
              <Button type="submit" className="w-full" size="lg">
                Sign in
              </Button>
            </form>

            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium mb-1">Demo account</p>
              <p className="text-xs text-slate-600">
                Use <span className="font-mono text-primary-700">+233 20 234 5678</span> or{' '}
                <span className="font-mono text-primary-700">i.mohammed@email.com</span>
              </p>
            </div>

            <p className="text-center text-sm text-slate-500 mt-6">
              Don't have an account?{' '}
              <Link to="/portal/register" className="text-primary-700 font-medium hover:text-primary-800">
                Register for Hajj
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Agency staff?{' '}
            <Link to="/login" className="text-slate-500 hover:text-slate-700 underline">
              Admin login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
