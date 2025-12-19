import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      className="loader-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", 
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      <img
        src="/Missing-No-Brain-GIF.gif"
        alt="Carregando..."
        style={{ width: "150px", height: "150px" }}
      />
    </div>
  );
};

export default Loader;
