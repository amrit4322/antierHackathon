// import React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import ProfilePageHeader from "./ProfileHeader";


function ProfilePage() {
  const [pills, setPills] = React.useState("2");

  const [name, setName] = useState("Unamed");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setName(editedName);
    setIsEditing(false);
  };
  React.useEffect(() => {
    document.body.classList.add("profile-page");
   
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);
  
  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="wrapper">
        <ProfilePageHeader editedName={editedName} isEditing={isEditing} />
        <div className="section">
          <Container>
            <div className="button-container">
              <h6 className="name mt-5 mb-5"
               style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  position: "relative",
                  top: "8px",
                }}>
                {isEditing && (
                  <input
                    className="form-control fas fa-map-marker-alt "
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    
                  />
                )}
                {!isEditing && (
                  <Button
                    className="btn-round"
                    color="info"
                    size="lg"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                )}

                {isEditing && (
                  <button
                    className="btn-round"
                    color="info"
                    size="lg"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                )}
              </h6>
            </div>
            <div className="middle-container d-flex justify-content-between align-items-center mt-3 p-2"
            style={{
                backgroundColor: "#e6e6e6",
                borderRadius: "12px",
              }}>
              <div className="dollar-div px-3"
               style={{
                  backgroundColor: "#5957f9",
                  padding: "12px",
                  borderRadius: "10px",
                }}>
                <div className="round-div"
                style={{
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#d8bdbd",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}>
                  <i className="fa fa-dollar dollar"></i>
                </div>
              </div>
              <div className="d-flex flex-column text-right mr-2"
              style={{
                  fontSize: "15px",
                  color: "#272727",
                  fontWeight: "bold",
                }}>
                <span className="current-balance">Current Tokens</span>
                <span className="amount">
                  <span className="dollar-sign">$</span>1476
                </span>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;