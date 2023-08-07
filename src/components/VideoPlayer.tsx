import { useEffect, useRef } from "react";
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

type Props = {
  user: IAgoraRTCRemoteUser;
  users: IAgoraRTCRemoteUser[];
};

const VideoPlayer = ({ user, users }: Props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && user.videoTrack) {
      user.videoTrack.play(ref.current);
    }
  }, [user.videoTrack]);

  return (
    <>
      {users[0].uid === user.uid ? (
        <div className="text-white col-span-1">
          Uid: {user.uid}
          <div className="relative">
            <div ref={ref} className="w-[500px] h-[320px] rounded-xl "></div>
            {/* <div className="w-20 h-20 bg-black absolute top-2"></div> */}
          </div>
        </div>
      ) : (
        <div className="text-white col-span-1">
          Uid: {user.uid}
          <div className="relative">
            <div ref={ref} className="w-[200px] h-[200px] rounded-xl"></div>
            {/* <div className="w-20 h-20 bg-black absolute top-2"></div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
