"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

// This is a placeholder for the PrioritiesSection component that will be implemented in Phase 2.3
const PrioritiesSection = () => {
  // Example priorities - will be replaced with actual content from main-accordion.tsx
  const priorities = [
    {
      id: 1,
      title: 'Community Safety',
      description: 'Implementing proactive policing strategies to ensure our neighborhoods remain safe and secure.'
    },
    {
      id: 2,
      title: 'Department Innovation',
      description: 'Modernizing equipment and training to keep our department at the forefront of law enforcement.'
    },
    {
      id: 3,
      title: 'Transparency',
      description: 'Maintaining open communication with the community through regular reports and public meetings.'
    },
    {
      id: 4,
      title: 'Drug Prevention',
      description: 'Combating drug trafficking and supporting rehabilitation programs to address addiction issues.'
    },
    {
      id: 5,
      title: 'Youth Outreach',
      description: 'Creating programs that engage young people and build positive relationships with law enforcement.'
    },
    {
      id: 6,
      title: 'Fiscal Responsibility',
      description: 'Managing department resources efficiently while maintaining high-quality service.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 uppercase text-center tracking-wide">Our Priorities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorities.map((priority) => (
            <Card key={priority.id} withYellowBorder withHoverEffect>
              <CardHeader>
                <CardTitle>{priority.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{priority.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrioritiesSection; 
