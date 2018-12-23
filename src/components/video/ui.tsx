import Video from "../video";
import React from "react";
import styles from "./video.module.css";

function UI() {
  return (
    <Video>
      {({ errorMessage, handleOpen, videoRef }) => {
        return (
          <section>
            <h2 data-testid="video-title">Video Title</h2>
            <video
              data-testid="video"
              className={styles.video}
              ref={videoRef}
              autoPlay={true}
              playsInline={true}
            />
            {errorMessage ? <p>{errorMessage}</p> : null}
            <button data-testid="video-button" onClick={handleOpen}>
              Open Camera
            </button>
            <button>Take photo</button>
          </section>
        );
      }}
    </Video>
  );
}

export default UI;
