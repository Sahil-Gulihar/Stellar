import React from 'react';
import { Github, Twitter, Facebook } from 'lucide-react';
import cn from 'classnames';

const Container = ({ children, className, id }) => {
  return (
    <div className={cn("mx-auto max-w-5xl p-6 sm:p-8", className)} id={id}>
      {children}
    </div>
  );
};

const Section = ({ children, className, id }) => {
  return (
    <section className={cn("py-8 md:py-12", className)} id={id}>
      {children}
    </section>
  );
};

const UIButton = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={cn("inline-flex items-center justify-center font-medium rounded transition", {
        'border border-gray-300 text-gray-700 hover:bg-gray-100': variant === 'outline',
        'p-2': size === 'icon',
      }, className)}
      ref={ref}
      {...props}
    />
  );
});

UIButton.displayName = 'UIButton';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Section>
        <Container className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <a href="/">
              <h3 className="sr-only">brijr/components</h3>
              <img
                src="path/to/your/logo.png" // Replace with the actual path to your logo
                alt="Logo"
                width={120}
                height={27.27}
                className="dark:invert hover:opacity-75 transition-all"
              />
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
              <UIButton className='py-2'variant="outline" >
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
