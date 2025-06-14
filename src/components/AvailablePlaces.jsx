import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx"; // Assuming you have an ErrorPage component for displaying errors
import { sortPlacesByDistance } from "../loc.js"; // Adjust the import path as necessary
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js"; // Assuming you have a custom hook for fetching data

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isLoading,
    fetchedData: availablePlaces,
    error,
  } = useFetch(fetchSortedPlaces, []);

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
