import React from 'react';
import { useNavigate } from 'react-router-dom';

function CallComponent(props) {
  const {chatid}=props
  const room=chatid
  const navigate = useNavigate();

  const handleRoom = (event) => {
    event.preventDefault(); 
    // navigate(`/VideoPage/${room}`);
    navigate('/VideoChat');
  };

  return (
    <div className="text-center ms-5">
            <button className='btn btn-outline-light'> 
                <i className='bi bi-camera-video-fill ' onClick={handleRoom}>Start Call</i>
            </button>
    </div>
  );
}

export default CallComponent;
