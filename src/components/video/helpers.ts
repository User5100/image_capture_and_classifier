interface Constraints {
  audio: boolean;
  video: boolean;
}

function getMediaStream(constraints: Constraints) {
  return navigator.mediaDevices.getUserMedia(constraints);
}

export { getMediaStream };
