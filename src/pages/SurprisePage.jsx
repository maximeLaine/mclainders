import ProposalForm from '../components/ProposalForm';

const SurprisePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl text-center mb-8 text-gray-800">Vous voulez nous faire des surprises ?</h1>

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
