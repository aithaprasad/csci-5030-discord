import React, { useState, useEffect } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/protected", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE0MGJmMzIxZmVjOGUxZDE0YTRkYmEiLCJpYXQiOjE2NDU0ODEwMDV9.rQ9cgF_K07Is45MRwf9Q5sYXNO79p20ZEvjoRRN735o", //localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCount(result);
      });
  }, []);
  return <div>{count}</div>;
};

export default Home;
