"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card/index';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faHandHoldingDollar, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

const PrioritiesSection = () => {
  // Priorities based on Sheriff Central
  const priorities = [
    {
      id: 1,
      title: 'Public Safety',
      description: 'Committed to maintaining and improving the safety and security of all residents through proactive policing and community engagement.',
      icon: faShield,
      link: '/about'
    },
    {
      id: 2,
      title: 'Fiscal Responsibility',
      description: 'Ensuring taxpayer dollars are used efficiently while maintaining the highest standards of service and protection.',
      icon: faHandHoldingDollar,
      link: '/about'
    },
    {
      id: 3,
      title: 'Community Partnerships',
      description: 'Building strong relationships between law enforcement and the community through transparency, accountability, and mutual respect.',
      icon: faPeopleGroup,
      link: '/about'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-center section-title">PRIORITIES</h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {priorities.map((priority) => (
            <Card 
              key={priority.id} 
              withYellowBorder 
              withHoverEffect
              className="flex flex-col"
            >
              <CardHeader className="bg-gray-100">
                <CardTitle className="flex items-center justify-center text-xl uppercase bg-gray-100">
                  <FontAwesomeIcon icon={priority.icon} className="mr-3" size="lg" />
                  {priority.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow bg-gray-100">
                <p className="flex-grow mb-6 text-center">{priority.description}</p>
                {priority.link && (
                  <div className="mt-auto text-center">
                    <Link 
                      href={priority.link}
                      className="inline-block campaign-button"
                    >
                      Learn More
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrioritiesSection; 
