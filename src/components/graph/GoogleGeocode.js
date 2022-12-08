import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_API_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('es');
Geocode.enableDebug();

const GoogleGeocode = async (currentAddr) => {
  return Geocode.fromAddress(currentAddr)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    })
    .catch((err) => console.log(err));
};

export default GoogleGeocode;
