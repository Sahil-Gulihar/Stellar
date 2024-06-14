import React from 'react';

const Button = ({ type = 'button', variant = 'default', className, children, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded text-sm font-medium focus:outline-none transition-colors duration-300';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Link Component
const Link = ({ href, className, children }) => (
  <a href={href} className={`text-blue-500 hover:text-blue-600 transition-colors duration-300 ${className}`}>
    {children}
  </a>
);

// Custom Label Component
const Label = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={`text-gray-300 font-medium ${className}`}>
    {children}
  </label>
);

// Custom Input Component
const Input = ({ id, type, className, ...props }) => (
  <input
    id={id}
    type={type}
    className={`w-full p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
    {...props}
  />
);

const MountainIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

export default function SigninComp() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-50">
      <header className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
        <Link href="/signin" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">Decentralized Freelance</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/signup" className="text-sm font-medium">
            Sign Up
          </Link>
          <Button variant="outline">Learn More</Button>
        </div>
      </header>
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="text-gray-400">Enter your email and password to access your account.</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email/Username</Label>
              <br/>
              <Input
                id="email"
                type="text"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm font-medium">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="space-y-2 text-center">
            <p className="text-gray-400">
              This platform uses skill tokens to compensate freelancers. Learn more about our{' '}
              <Link href="#" className="font-medium">
                skill token system
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <footer className="container mx-auto border-t border-gray-800 px-4 py-6 md:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">&copy; 2024 Decentralized Freelance. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}