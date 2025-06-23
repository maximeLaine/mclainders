import React, { useState } from 'react';
import { useFormSubmit } from '../hooks/useFormSubmit';

// Async function to submit RSVP data to Netlify function
async function submitRSVP(formData) {
  const response = await fetch('/.netlify/functions/submitRSVP', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  return {
    success: response.ok,
    message: result.message || (response.ok ? 'Merci ! Votre réponse a été enregistrée.' : 'Une erreur est survenue'),
  };
}

/**
 * RSVPPage Component
 * Allows guests to confirm their attendance to the wedding
 */
const RSVPPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    attendance: '',
    comments: ''
  });

  const { submitting, submitStatus, handleSubmit } = useFormSubmit(submitRSVP);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData, () => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        attendance: '',
        comments: ''
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
    {/* Hero Section */}
    <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/image1.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light mb-6">Confirmez Votre Venue</h1>
        <p className="text-xl max-w-2xl">Nous espérons que vous pourrez vous joindre à nous pour notre grand jour</p>
      </div>
    </div>

    {/* Form Section */}
    <div className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl text-center text-gray-800 mb-8">Mariage de Claire et Maxime 💝</h2>
        
        <div className="flex justify-center">
          <div className="w-24 h-px bg-gray-400 my-8"></div>
        </div>
        
        <form className="space-y-8" onSubmit={onSubmit}>
          {/* Name Fields */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Prénom<span className="text-xs text-gray-500">(*)</span></label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Nom<span className="text-xs text-gray-500">(*)</span></label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">E-mail <span className="text-xs text-gray-500">(*)</span></label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              required 
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block mb-1 text-sm">Serez-vous présent(e) ? <span className="text-xs text-gray-500">(*)</span></label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="attendance" 
                  className="mr-2" 
                  value="yes" 
                  checked={formData.attendance === 'yes'} 
                  onChange={handleChange} 
                  required 
                />
                Oui
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="attendance" 
                  className="mr-2" 
                  value="no" 
                  checked={formData.attendance === 'no'} 
                  onChange={handleChange} 
                  required 
                />
                Non
              </label>
            </div>
          </div>


          {/* Questions/Comments */}
          <div>
            <label className="block mb-1 text-sm">Questions ou commentaires</label>
            <textarea 
              name="comments" 
              value={formData.comments} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 h-32 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-colors duration-300 w-full md:w-auto font-semibold"
              disabled={submitting}
            >
              {submitting ? '⏳ Envoi en cours...' : 'Confirmer ma présence'}
            </button>
            
            {submitStatus && (
              submitStatus.success ? (
                <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-sm">
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              ) : (
                <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default RSVPPage;
