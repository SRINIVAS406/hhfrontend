import React, { useEffect } from 'react';
import Modal from 'your-modal-library'; // Replace with the actual modal library you're using

const ProfileCard = () => {
  useEffect(() => {
    // Set the app element for accessibility
    Modal.setAppElement('#helpHand'); // Replace with the actual app element selector
  }, []);

  // Rest of your component code

  return (
    <div id="helpHand">
      {/* Your component content */}
      {/* This is the main content of your app that should not be seen by screen readers when the modal is open */}
    </div>
  );
};

export default ProfileCard;
