import React from 'react';

const RSVPPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
    {/* Hero Section */}
    <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('/gallery/image1.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light mb-4">CONFIRMEZ VOTRE VENUE</h1>
        <p className="text-xl max-w-2xl">Nous espérons que vous pourrez vous joindre à nous ! Remplissez le formulaire ci-dessous.</p>
      </div>
    </div>

    {/* Form Section */}
    <div className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl text-center font-light mb-12">Mariage de Soria et Antoine</h2>
        
        <form className="space-y-8">
          {/* Name Fields */}
          <div>
            <label className="block mb-1 text-sm">Nom <span className="text-xs text-gray-500">(obligatoire)</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Prénom</label>
                <input type="text" className="w-full border border-gray-300 p-2" required />
              </div>
              <div>
                <label className="block mb-1 text-sm">Nom de famille</label>
                <input type="text" className="w-full border border-gray-300 p-2" required />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">E-mail <span className="text-xs text-gray-500">(obligatoire)</span></label>
            <input type="email" className="w-full border border-gray-300 p-2" required />
          </div>

          {/* Attendance */}
          <div>
            <label className="block mb-1 text-sm">Serez-vous présent(e) ? <span className="text-xs text-gray-500">(obligatoire)</span></label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center">
                <input type="radio" name="attendance" className="mr-2" value="yes" />
                Oui
              </label>
              <label className="flex items-center">
                <input type="radio" name="attendance" className="mr-2" value="no" />
                Non
              </label>
            </div>
          </div>

          {/* Additional Guests */}
          <div>
            <label className="block mb-1 text-sm">Nom des invités de votre groupe</label>
            <input type="text" className="w-full border border-gray-300 p-2" />
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block mb-1 text-sm">Vous avez des restrictions alimentaires à nous signaler ?</label>
            <input type="text" className="w-full border border-gray-300 p-2" />
          </div>

          {/* Questions/Comments */}
          <div>
            <label className="block mb-1 text-sm">Questions ou commentaires</label>
            <textarea className="w-full border border-gray-300 p-2 h-24"></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-black text-white px-8 py-2 hover:bg-gray-800 transition">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default RSVPPage;
