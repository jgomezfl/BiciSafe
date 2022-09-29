import * as React from "react";

//importamos los componentes correspondientes al mapa
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//importamos los componentes del MUI material

export const MapView = () =>{
    const [state, setState] = React.useState({
        longitude: 0,
        latitude: 0,
    });

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log(position);
            setState({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            });
            console.log(state)
          },
          function (error) {
            console.error("Error Code = " + error.code + " - " + error.message);
          },
          {
            enableHighAccuracy: true,
          }
        );
      }, []);
    
    return (
        <>
            <MapContainer center={[4.5760694, -74.1038984]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={[4.5760694, -74.1038984]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
            </MapContainer>
        </>
    );

}

export default MapView;