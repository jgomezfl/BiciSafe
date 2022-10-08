import * as React from "react";

//importamos los componentes correspondientes al mapa
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//importamos los componentes del MUI material
var ubication = [];
navigator.geolocation.getCurrentPosition(
  function(position){
    ubication = [position.coords.latitude.toString(), position.coords.longitude.toString()];
    console.log(ubication);
  },
  function (error) {
    console.error("Error Code = " + error.code +" - " + error.message);
  },
  {
    enableHighAccuracy: true,
  }
);

export const MapView = () =>{
    
    return (
        <>
            <MapContainer center={[ubication[0], ubication[1]]} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={[ubication[0], ubication[1]]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
            </MapContainer>
        </>
    );

}

export default MapView;