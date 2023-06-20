import { BiLocationPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCity } from "../GlobalRedux/slice/locationSlice";

const FindHospitalsNearMe = () => {
  const dispatch = useDispatch();

  const handleFindHospitalsNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          const city = data.locality;
          dispatch(setCity(city));
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <button
      className="btn md:mt-0 md:ml-2 mt-2"
      onClick={handleFindHospitalsNearMe}
    >
      Nearby Hospitals <BiLocationPlus className="ml-2 w-6 h-6" />
    </button>
  );
};

export default FindHospitalsNearMe;
