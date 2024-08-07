import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader({editedName,isEditing}) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url( https://wallpapercave.com/wp/wp4041617.jpg )",
          }}
          ref={pageHeader}
        ></div>
        <Container >
          <div>
            <img alt="..." src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-3.jpg"
              style={{
                height: "190px",
                borderRadius: "60%",
                padding: "10px",
            }}></img>
          </div>
          <h5
          style={{
            color:"#ffffff"
                }}>{isEditing ? "Editing..." : editedName}</h5>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;