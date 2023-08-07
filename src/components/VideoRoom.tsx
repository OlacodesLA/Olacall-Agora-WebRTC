import { useEffect, useState } from "react";
import AgoraRTC, {
  UID,
  ILocalTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import { client } from "../lib/client";
import VideoPlayer from "./VideoPlayer";
// import { IUser } from "../interfaces";

const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
const TOKEN = import.meta.env.VITE_AGORA_TOKEN;
const CHANNEL_ID = import.meta.env.VITE_AGORA_CHANNEL;

const VideoRoom = () => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [localTracks, setLocalTracks] = useState<ILocalTrack[]>([]);

  const handleUserJoined = async (
    user: IAgoraRTCRemoteUser,
    mediaType: "audio" | "video"
  ) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio" && user.audioTrack) {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL_ID, TOKEN, null)
      .then((uid: UID) => {
        return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
      })
      .then(([tracks, uid]: [ILocalTrack[], UID]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);

        const localUser: IAgoraRTCRemoteUser = {
          uid,
          hasAudio: true,
          hasVideo: true,
          videoTrack: videoTrack as never,
          audioTrack: audioTrack as never,
        };

        setUsers((previousUsers) => [...previousUsers, localUser]);
        client.publish(tracks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return () => {
      //Clean up events
      for (const localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {users.map((user: IAgoraRTCRemoteUser) => {
        return <VideoPlayer user={user} users={users} key={user.uid} />;
      })}
    </div>
  );
};

export default VideoRoom;
