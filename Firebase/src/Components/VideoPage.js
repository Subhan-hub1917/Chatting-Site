import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const  VideoPage=(props)=> {
  const {chatid}=useParams();
  const {userName}=props;
  
  // const roomID=chatid;
  const roomID= 'Join'
  const name=userName;
  let myMeeting = async (element) => {
 // generate Kit Token
  const appID = 2008783038;
  const serverSecret = "b1bcb2c8080fe2d37ce9a8ddf021efbe";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),  name );


 // Create instance object from Kit Token.
  const zp = ZegoUIKitPrebuilt.create(kitToken);
  // start the call
  zp.joinRoom({
    container: element,
    sharedLinks: [
      {
        name: 'Copy Link',
        url:
         window.location.protocol + '//' + 
         window.location.host + window.location.pathname +
          '?roomID=' +
          roomID,
      },
    ],
    scenario: {
      mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
    },
  });
  
};
  return (
    <div ref={myMeeting}>
    </div>
  );
}

export default VideoPage;
