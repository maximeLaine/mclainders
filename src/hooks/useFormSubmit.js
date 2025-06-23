import { useState } from 'react';

/**
 * useFormSubmit - Generic hook to handle form submission with loading and status state
 * @param {function} submitFn - Async function to call on submit (should return a response object)
 * @returns {object} { submitting, submitStatus, handleSubmit }
 */
export function useFormSubmit(submitFn) {
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (formData, onSuccess) => {
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await submitFn(formData);
      if (result.success) {
        setSubmitStatus({ success: true, message: result.message || 'Succès' });
        if (onSuccess) onSuccess();
      } else {
        setSubmitStatus({ success: false, message: result.message || 'Une erreur est survenue' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: error.message || 'Une erreur est survenue lors de l\'envoi du formulaire.' });
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitStatus, handleSubmit };
} 