import * as React from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Button  } from 'react-bootstrap';
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-geosearch/dist/geosearch.umd.js";

import icon from "../Layouts/constants";
import { Card, CardContent, CardActions, CardHeader, IconButton } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PedalBike } from '@mui/icons-material';

function LeafletGeoSearch() {
  const map = useMap();

  const provider = new OpenStreetMapProvider();

  React.useEffect(() => {
    if (!map) return;

    const searchControl = new SearchControl({
      notFoundMessage: "Sorry, that address could be found.",
      provider,
      marker:{
        icon
      }
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

export const MapView = () =>{

  const [markerPos, setMarkerPos] = React.useState(null);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => { setOpenDialog(true); };
  const handleCloseDialog = () => { setOpenDialog(false); };

  function LocationMarker() {
    const [position, setPosition] = React.useState(null);

    const map = useMap();

    React.useEffect(() => {
      map.locate().on("locationfound", function(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }, [map]);

    return position === null ? null :  (
      <Marker position={position} icon={icon} 
       eventHandlers={{
         mouseover: (event) => event.target.openPopup(),
         mouseout: (event) => event.target.closePopup(),
       }}>
        <Popup>
          Aquí te encuentras.
        </Popup>
      </Marker>
    );
  };

  function NewMarker(){
    var [position, setPosition] = React.useState(null);

    useMapEvents({
      click(e){
        console.log(e.latlng)
        setPosition(e.latlng);
      }
    });

    return position === null ? null : (
      <Marker position={position} icon={icon}
       eventHandlers={{
        mouseover: (event) => event.target.openPopup()
       }}>
        <Popup className="justify-content-center d-flex">
          <Card>
            <CardHeader
             avatar={
              <IconButton aria-label="secondaryIcon">
                <PedalBike/>
              </IconButton>
             }
             title="LUGAR"
             subheader="¿Qué deseas hacer?"
            />
            <CardContent>
              <div className="d-flex align-items-center flex-column">
                <Button className="botones_aplicacion" size="small">Ir</Button>
                <br/>
                <Button className="botones_aplicacion" size="small" onClick={handleOpenDialog}>Guardar</Button>
              </div>
            </CardContent>
          </Card>
        </Popup>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer
      center={[49.1951, 16.6068]}
      zoom={15}
      scrollWheelZoom
      style={{ height: "100vh" }}>
        <LeafletGeoSearch />
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
        <NewMarker />
      </MapContainer>
      <Dialog
       open={openDialog}
       onClose={handleCloseDialog}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro de guardar este lugar?"}</DialogTitle>
        <DialogContent>
          <DialogContent id ="alert-dialog-description">
            Por favor Ingresa la información solicitada y confirma el envío de datos.
            {markerPos}
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button className="btn btn-danger" onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button className="btn btn-success" onClick={handleCloseDialog}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

export default MapView;