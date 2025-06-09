import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx"; // Assuming you have an ErrorPage component for displaying errors
import { sortPlacesByDistance } from "../loc.js"; // Adjust the import path as necessary
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]); // This would typically be replaced with a state or prop that holds the available places
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });

        setAvailablePlaces(places); // Ensure we set an empty array if no places are returned
      } catch (error) {
        setError({
          message:
            error.message || "Failed to fetch places, Pleas try Again later",
        });
        console.error("Error fetching available places:", error);
        setIsLoading(false);
      }
    }
    fetchPlaces();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (error) {
    return <ErrorPage title="An Error Occured..!" message={error.message} />;
  }

  // Fetch available places from the API
  //   fetch("http://localhost:3000/places") // Adjust the URL to your API endpoint
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAvailablePlaces(data.places);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching available places:", error);
  //     });

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading available places...!"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
