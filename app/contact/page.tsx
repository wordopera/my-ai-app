// File: app/contact/page.tsx
import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-h1 font-bold mb-6">Contact Us</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;