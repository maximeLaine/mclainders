import ProposalForm from '../components/ProposalForm';
import { assetUrl } from '../utils/assets';

const SurprisePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: `url('${assetUrl('/gallery/baniere_surprise.jpg')}')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Surprise !</h1>
          <p className="text-xl max-w-2xl">Vous voulez nous faire des surprises ?</p>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-lg mb-12 text-gray-700 leading-relaxed">
            Vous pouvez contacter Aude, maitresse de cérémonie, via le formulaire suivant.<br />
            Elle reviendra vers vous après avoir échangé avec Hubert et Romain, également maîtres de cérémonie,
            pour organiser au mieux votre surprise en fonction du déroulé du week-end.<br />
            Merci d'avance !
          </p>

          <div className="flex justify-center mb-8">
            <div className="w-24 h-px bg-gray-400"></div>
          </div>

          <ProposalForm />
        </div>
      </section>
    </div>
  );
};

export default SurprisePage;
