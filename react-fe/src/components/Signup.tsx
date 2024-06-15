import  { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, LabelHTMLAttributes, InputHTMLAttributes, SVGProps } from 'react';

// Button Component Props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button: FC<ButtonProps> = ({ type = 'button', variant = 'default', className, children, ...props }) => {
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

// Custom Link Component Props
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link: FC<LinkProps> = ({ href, className, children, ...props }) => (
  <a href={href} className={`text-blue-500 hover:text-blue-600 transition-colors duration-300 ${className}`} {...props}>
    {children}
  </a>
);

// Custom Label Component Props
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label: FC<LabelProps> = ({ htmlFor, className, children, ...props }) => (
  <label htmlFor={htmlFor} className={`text-gray-300 font-medium ${className}`} {...props}>
    {children}
  </label>
);

// Custom Input Component Props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ id, type, className, ...props }) => (
  <input
    id={id}
    type={type}
    className={`w-full p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
    {...props}
  />
);

// MountainIcon Component Props
interface MountainIconProps extends SVGProps<SVGSVGElement> {}

const MountainIcon: FC<MountainIconProps> = (props) => (
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

const SignupComp: FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-50">
      <header className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">Decentralized Freelance</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/signin" className="text-sm font-medium">
            Sign In
          </Link>
          <Button variant="outline">Learn More</Button>
        </div>
      </header>
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-400">Enter your details to get started.</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="space-y-2 text-center">
            <p className="text-gray-400">
              By creating an account, you agree to our{' '}
              <Link href="#" className="font-medium">
                terms and conditions
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

export default SignupComp;
