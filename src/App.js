import { useState } from "react";
import { TextField, Button, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

const App = () => {
  const { register, handleSubmit, formState } = useForm();
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

  const setDistance = async (travelPoints) => {
    const distanceObject = await getDistance(
      travelPoints.origin,
      travelPoints.destination
    );

    const distance = Math.floor(distanceObject.steps[0].distance.greatCircle);

    setDistanceTraveled(distance);
  };

  return (
    <div className="App">
      <h1>Travel Point Calculator</h1>
      <section>
        <h2>Let's get that juicy distance!</h2>
        <form onSubmit={handleSubmit((data) => setDistance(data))}>
          <InputLabel>Where did you leave from?</InputLabel>
          <TextField {...register("origin")} required />
          <InputLabel>Where you headed?</InputLabel>
          <TextField {...register("destination")} required />
          <Button type="submit">Calculate Distance</Button>
        </form>
      </section>
      {distanceTraveled && (
        <>
          <h2>You went this far!</h2>
          <p>{distanceTraveled} Km</p>
        </>
      )}
    </div>
  );
};

export default App;
