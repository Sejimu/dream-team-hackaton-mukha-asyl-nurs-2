import React from "react";

const NotFoundPage = () => {
  const imageUrl = "path/to/your/image.jpg";

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url("https://media.tenor.com/dxA2j-gsp4oAAAAC/glitch-static.gif")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };

  const neonTextStyle = {
    color: "#fff",
    fontSize: "80px",
    textShadow:
      "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de",
    animation: "neon 1.5s ease-in-out infinite alternate",
  };

  return (
    <div className="my-component" style={containerStyle}>
      <h1 style={neonTextStyle}>NOT FOUND</h1>
    </div>
  );
};

export default NotFoundPage;
