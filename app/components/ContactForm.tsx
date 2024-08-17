// File: app/components/ContactForm.tsx

"use client";

import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // For example, send data to Supabase or another backend
    // Set status based on success or failure
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="message"
        value={formState.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
        rows={4}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="btn btn-primary">Send Message</button>
      {status && <p className="text-green-500">{status}</p>}
    </form>
  );
};

export default ContactForm;