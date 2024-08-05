"use client";
import React from 'react';
import { useForm } from 'react-hook-form';

function Whatsapp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const messages = [
    "Hi, how are you?",
    "Hello! Let's chat.",
    "Hey! What's up?",
    "Good day! Let's connect.",
    "Hi there! Got a minute?"
  ];

  const onSubmit = (data:any) => {
    const { phoneNumber, message } = data;
    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}&app_absent=0`;
    window.location.href = url;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Phone Number:
            <input
              type="text"
              {...register('phoneNumber', { required: 'Phone number is required', pattern: { value: /^\d+$/, message: 'Phone number must be digits only' } })}
              placeholder="Enter phone number with country code"
              className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Select Message:
            <select {...register('message', { required: 'Message is required' })} className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300">
              <option value="">Select a message</option>
              {messages.map((msg, index) => (
                <option key={index} value={msg}>{msg}</option>
              ))}
            </select>
          </label>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
          Send
        </button>
      </form>
    </div>
  );
}

export default Whatsapp;
