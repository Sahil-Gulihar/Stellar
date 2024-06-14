import React from 'react';
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

const Feature = ({ title, description, icon }) => {
  return (
    <div className="text-center">
      <img src={icon} alt={title} className="mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      icon: 'path/to/icon1.png', 
    },
    {
      title: 'Lorem Ipsum',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      icon: 'path/to/icon2.png', 
    },
    {
      title: 'Lorem Ipsum',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      icon: 'path/to/icon3.png', 
    },
    {
      title: 'Lorem Ipsum',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      icon: 'path/to/icon3.png', 
    },
    {
      title: 'Lorem Ipsum',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      icon: 'path/to/icon3.png', 
    },
    {
      title: 'Lorem Ipsum',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      icon: 'path/to/icon3.png', 
    },
    

    

  ];

  return (
    <Section>
      <Container className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
        <p className="text-xl text-gray-400 mb-6">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </Container>
      <Container className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </Container>
    </Section>
  );
}
