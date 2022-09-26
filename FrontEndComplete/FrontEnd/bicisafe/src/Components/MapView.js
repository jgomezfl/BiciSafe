import * as React from "react";

//importamos los componentes correspondientes al mapa
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//importamos los componentes del MUI material


export class MapView extends React.Component{
    
    render(){
        return (
            <>
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                </MapContainer>
            </>
        );
    }
}

export default MapView;