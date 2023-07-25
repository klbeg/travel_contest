import { useMemo, useState } from "react";
import axios from "axios";

const App = () => {
  const [distanceTraveled, setDistanceTraveled] = useState(null);

  const getDistance = async (pointA, pointB) => {
    const options = {
      method: "GET",
      url: "https://distanceto.p.rapidapi.com/get",
      params: {
        route: '[{"t":"' + pointA + '"},{"t":"' + pointB + '"}]',
        car: "false",
      },
      headers: {
        "X-RapidAPI-Key": "7d6eb9a0ffmshcffdcd16d7038e8p131bf7jsn9db2d321e354",
        "X-RapidAPI-Host": "distanceto.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const setDistance = async () => {
    const distance = await getDistance("philadelphia", "detroit");
    setDistanceTraveled(distance);
    console.log("distance: ", distance.steps[0].distance.greatCircle);
  };

  if (distanceTraveled === null) {
    setDistance();
  }

  return (
    <div className="App">
      <h1>Travel Point Calculator</h1>
      {distanceTraveled && (
        <>
          <h2>You went this far!</h2>
          <p>{distanceTraveled.steps[0].distance.greatCircle} Km</p>
        </>
      )}
    </div>
  );
};

export default App;
