
import * as React from 'react';
import './FeedbackButton.css';

export default function FeebackButton() {

  const issuePage = () => {
    window.open('https://github.com/Official-Codaisseur-Graduate/gitgud-client/issues', '_blank');
  };

  return (
    <button
      id="popup"
      className="feedback-button"
      onClick={() => issuePage()}
    >
      Feedback
      </button>
  )

}