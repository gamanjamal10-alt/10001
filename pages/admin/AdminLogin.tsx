import React, { useState } from 'react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="flex items-center justify-center w-full py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          تسجيل الدخول للوحة التحكم
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="كلمة المرور"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth>
            دخول
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
