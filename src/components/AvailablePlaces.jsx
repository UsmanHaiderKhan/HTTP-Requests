import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]); // This would typically be replaced with a state or prop that holds the available places
  useEffect(() => {
    fetch("http://localhost:3000/places") // Adjust the URL to your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setAvailablePlaces(data.places);
      })
      .catch((error) => {
        console.error("Error fetching available places:", error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
