import React, { useState } from 'react';

const ProposalForm = () => {
  const [proposalName, setProposalName] = useState("");
  const [proposalEmail, setProposalEmail] = useState("");
  const [proposalContent, setProposalContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // Proposal form submission
  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    
    if (!proposalName || !proposalEmail || !proposalContent) return;
    
    setSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare data to submit
      const dataToSubmit = {
        name: proposalName,
        email: proposalEmail,
        content: proposalContent
      };
      
      // Send data to serverless function
      const response = await fetch('/.netlify/functions/submitProposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Merci ! Votre proposition a été enregistrée.' });
        
        // Reset form
        setProposalName("");
        setProposalEmail("");
        setProposalContent("");
      } else {
        setSubmitStatus({ success: false, message: `Erreur: ${result.message || 'Une erreur est survenue'}` });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus({ success: false, message: 'Une erreur est survenue lors de l\'envoi du formulaire.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {!submitStatus?.success ? (
        <form onSubmit={handleProposalSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-4">
            <label htmlFor="proposalName" className="block text-sm font-medium text-gray-700 mb-1">
              Votre nom
            </label>
            <input
              type="text"
              id="proposalName"
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="proposalEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Votre email
            </label>
            <input
              type="email"
              id="proposalEmail"
              value={proposalEmail}
              onChange={(e) => setProposalEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="proposalContent" className="block text-sm font-medium text-gray-700 mb-1">
              Votre proposition
            </label>
            <textarea
              id="proposalContent"
              value={proposalContent}
              onChange={(e) => setProposalContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition disabled:bg-gray-400"
          >
            {submitting ? 'Envoi en cours...' : 'Envoyer votre proposition'}
          </button>
        </form>
      ) : (
        <div className="max-w-2xl mx-auto p-6 bg-green-100 text-green-800 rounded-lg shadow-md text-center">
          <p className="text-xl font-medium mb-2">✓ {submitStatus.message}</p>
          <p>Nous vous contacterons bientôt.</p>
        </div>
      )}
      
      {submitStatus && !submitStatus.success && (
        <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          {submitStatus.message}
        </div>
      )}
    </div>
  );
};

export default ProposalForm;
