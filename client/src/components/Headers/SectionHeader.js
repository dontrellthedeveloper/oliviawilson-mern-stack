import React from "react";
import {

  Container,

} from "reactstrap";



const SectionHeader = () => {


  // video - header 4
  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const videoRef = React.createRef();
  const videoButtonClick = () => {
    if (videoPlaying) {
      setVideoPlaying(false);
      videoRef.current.pause();
    } else {
      setVideoPlaying(true);
      videoRef.current.play();
    }
  };

  return (
    <>
      <div className="section section-header cd-section" style={{paddingTop: '0'}} id="headers">


        {/* ********* HEADER 3 ********* */}
        <div className="header-3">


          <div className="page-header header-video">
            <div className="filter filter-danger" />
            {/* We show the video image placeholder instead of the video for small devices */}
            <div
                className="video-image"
                style={{
                  backgroundImage:
                      "url(" + require("assets/img/video-placeholder.png") + ")",
                }}
            />
            <video
                id="video-source"
                loop="loop"
                muted="muted"
                preload="auto"
                volume="0"
                ref={videoRef}
                autoPlay
            >
              <source
                  src={require("assets/video/olivia-header.mp4")}
                  type="video/mp4"
              ></source>
              Video not supported
            </video>
            <div className="content-center">
              <Container className="upper-container text-center">



                  <img src={require("assets/img/ecommerce/olivia-wilson-logo-light.png")}  alt=""/>


              </Container>
            </div>
          </div>
        </div>
        {/* ********* END HEADER 3 ********* */}


        {/*/!* ********* HEADER 4 (w/ video) ********* *!/*/}

      </div>
    </>
  );
}

export default SectionHeader;
