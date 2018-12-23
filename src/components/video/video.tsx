import React from "react";
import { getMediaStream } from "./helpers";

declare global {
  interface Window {
    stream: MediaStream;
    constraints: {
      audio: boolean;
      video: boolean;
    };
  }
}

interface ChildProps {
  errorMessage: string;
  handleOpen: (event: React.MouseEvent) => Promise<void>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

interface Props {
  children: (props: ChildProps) => React.ReactNode;
}

interface State {
  errorMessage: string;
}

class Video extends React.Component<Props, State> {
  public state = {
    errorMessage: "",
  };

  public videoRef = React.createRef<HTMLVideoElement>();

  public handleOpen = async (
    event: React.MouseEvent<Element>,
  ): Promise<void> => {
    try {
      event.stopPropagation();
      const stream: MediaStream = await getMediaStream(this.constraints);
      this.handleSuccess(stream);
    } catch (err) {
      this.handleError(err);
    }
  }

  public render() {
    const { errorMessage } = this.state;
    const { children } = this.props;
    if (children) {
      return children({
        errorMessage,
        handleOpen: this.handleOpen,
        videoRef: this.videoRef,
      });
    } else {
      return null;
    }
  }

  private constraints = (window.constraints = {
    audio: false,
    video: true,
  });

  private handleSuccess(stream: MediaStream): void {
    const videoNode = this.videoRef.current;
    if (videoNode) {
      videoNode.srcObject = stream;
    }
  }

  private handleError(error: Error) {
    const { name: errorName } = error;
    if (errorName === "ConstraintNotSatisfiedError") {
      this.setErrorMessage(`The resolution is not supported by your device.`);
    } else if (errorName === "PermissionDeniedError") {
      this.setErrorMessage(
        "Permissions have not been granted to use your camera and " +
          "microphone, you need to allow the page access to your devices in " +
          "order for the application to work.",
      );
    }
    this.setErrorMessage(`getUserMedia error: ${errorName}`, error);
  }

  private setErrorMessage(message: string, error?: Error): void {
    if (typeof error !== "undefined") {
      this.setState({ errorMessage: message });
      console.log(error);
    }
  }
}

export default Video;
