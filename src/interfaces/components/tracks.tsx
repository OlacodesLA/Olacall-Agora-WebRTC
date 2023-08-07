import { UID, ILocalTrack } from "agora-rtc-sdk-ng";

export interface IUser {
  uid: UID;
  hasVideo: boolean;
  hasAudio: boolean;
  videoTrack: ILocalTrack;
  audioTrack: ILocalTrack;
}
