import React, { ReactNode } from 'react';
import { Github, Twitter, Facebook } from 'lucide-react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={`mx-auto max-w-5xl p-6 sm:p-8 ${className}`} id={id}>
      {children}
    </div>
  );
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section className={`py-8 md:py-12 ${className}`} id={id}>
      {children}
    </section>
  );
};

interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'solid';
  size?: 'icon' | 'small' | 'medium' | 'large';
  asChild?: boolean;
}

const UIButton = React.forwardRef<HTMLButtonElement, UIButtonProps>(
  ({ className, variant = 'solid', size = 'medium', asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition';
    const variantStyles = variant === 'outline' ? 'border border-gray-300 text-gray-700 hover:bg-gray-100' : '';
    const sizeStyles = (() => {
      switch (size) {
        case 'icon':
          return 'p-2';
        case 'small':
          return 'px-4 py-2';
        case 'medium':
          return 'px-6 py-3';
        case 'large':
          return 'px-8 py-4';
        default:
          return '';
      }
    })();

    return (
      <Comp
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
UIButton.displayName = 'UIButton';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Section>
        <Container className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <a href="/">
              <h3 className="sr-only">brijr/components</h3>
              <h1 className='text-5xl font-bold'>Decentr</h1>
            </a>
            <p>
              brijr/components is a collection of Next.js, React, Typescript
              components for building landing pages and websites.
            </p>
            <div className="flex gap-2">
              <UIButton variant="outline" size="icon">
                <Github />
              </UIButton>
              <UIButton variant="outline" size="icon">
                <Twitter />
              </UIButton>
              <UIButton variant="outline" size="icon">
                <Facebook />
              </UIButton>
            </div>
          </div>
          <div className="flex flex-col gap-6 not-prose">
            <h5>Subscribe for Company Updates</h5>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="example@fjord.dev"
                className="bg-gray-800 text-white p-2 rounded"
              />
              <p className='mb-4 mt-2'>Lorem ipsum dolor sit amet.</p>
              <UIButton className='py-2' variant="outline">
                Submit
              </UIButton>
            </form>
          </div>
        </Container>
        <Container className="border-t border-gray-700 not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center mt-6 pt-6">
          <div className="flex gap-2">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          <p className="text-muted-foreground">
            © <a href="https://github.com/brijr/components" className="underline">brijr/components</a>. All rights reserved. 2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
}