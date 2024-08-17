// File: app/showcase/page.tsx
// August 16, 2024

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    title: "AI Starter Stack",
    description: "Get your AI project off the ground quickly with our comprehensive starter kit. Perfect for developers looking to integrate AI into their applications.",
    link: "/showcase/ai-starter-stack",
    color: "bg-primaryBlue"
  },
  {
    title: "Custom GPT",
    description: "Tailor GPT models to your specific needs with our customization tools. Ideal for businesses requiring specialized AI solutions.",
    link: "/showcase/custom-gpt",
    color: "bg-fuschia"
  },
  {
    title: "Audio to Text",
    description: "Convert audio files to text with high accuracy using our advanced AI models. Great for transcription services and content creators.",
    link: "/showcase/audio-to-text",
    color: "bg-yellow"
  }
];

export default function Showcase() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-h1 font-bold text-deepBlue dark:text-white mb-8 text-center">Our AI Solutions</h1>
      <p className="text-body text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
        Explore our cutting-edge AI solutions designed to empower your projects and streamline your workflows. From rapid prototyping to specialized AI models, we've got you covered.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <div key={index} className="bg-white dark:bg-deepBlue-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className={`${solution.color} h-2`}></div>
            <div className="p-6">
              <h2 className="text-h2 font-bold mb-4 text-deepBlue dark:text-white">{solution.title}</h2>
              <p className="text-body text-gray-600 dark:text-gray-300 mb-6">{solution.description}</p>
              <Link href={solution.link} className="inline-flex items-center text-primaryBlue dark:text-fuschia hover:underline">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-h2 font-bold text-deepBlue dark:text-white mb-4">Ready to get started?</h2>
        <p className="text-body text-gray-600 dark:text-gray-300 mb-8">
          Contact our team to learn how our AI solutions can benefit your business.
        </p>
        <Link href="/contact" className="btn btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
// Last line