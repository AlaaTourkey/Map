'use client';
import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
// import Filter from '../Filter/page';
import { useRouter } from 'next/navigation';





const containerStyle = {
  width: '100%',
  height: '100vh',
  position:'relative',
  overflow: 'unset'
};
const center = {
  lat: 30.0444,
  lng: 31.2357,
};
const customIconUrl = 'https://schools.egyclimate.net/assets/img/location_marker.png';

const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

const GMap = ({ markers = [], onSeeMoreClick }) => {
  const [filteredMarkers, setFilteredMarkers] = useState(markers || []);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const router = useRouter();


  const handleFilterApply = (filteredData) => {
    const newMarkers = filteredData.map(item => ({
      latitude: item.latitude,
      longtude: item.longtude
    }));
    setFilteredMarkers(newMarkers);
  };

  const handleFilterClear = () => {
    setFilteredMarkers(markers);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowInfoWindow(true);

  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
    setSelectedMarker(null);

  };

  const seeMoreClick = (schoolId) => {
    router.push(`/schoolProfile/${schoolId}`);
    console.log(schoolId);


  };

  const handleMapClick = () => {
    handleInfoWindowClose(); // Close info window on map click
  };


  return (
    <>

      <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <div style={containerStyle} >
          <Map onClick={handleMapClick} defaultZoom={6} defaultCenter={center} options={{ styles: mapStyles }}  >
            {filteredMarkers && filteredMarkers.map((mark, index) => (
              <Marker key={index} position={{ lat: mark.latitude, lng: mark.longtude }} icon={customIconUrl} onClick={() => handleMarkerClick(mark)} />
            ))}

            {selectedMarker && showInfoWindow && (
              <InfoWindow
                position={{ lat: selectedMarker.latitude, lng: selectedMarker.longtude }}
                onCloseClick={handleInfoWindowClose}
                className="custom-info-window" style={{ margin: '0px', overflow: 'unset', width: '100%' }}
              >

                <div className="card p-0 border-0" style={{ width: '22rem' }}>
                  <div>
                    <img src={selectedMarker.image_url} height={200} className=" w-100 card-img-top" alt="..." />
                    <hr className="m-0" />

                    <div className="card-body row">
                      <div className="col d-flex flex-column">
                        <h3 className="card-title h5 ">{selectedMarker.title}</h3>
                        <p className="card-text text-muted">{selectedMarker.description}</p>

                        <dl className="row mt-auto">

                          <dt className="col-sm-5 mb-2">Type</dt>
                          <dd className="col-sm-7">{selectedMarker.type?.name}</dd>

                          <dt className="col-sm-5 mb-2">Classification</dt>
                          <dd className="col-sm-7">{selectedMarker.school_type?.name}</dd>

                          <dt className="col-sm-5 mb-2">Sector</dt>
                          <dd className="col-sm-7">{selectedMarker.educational_administration?.description}</dd>

                          <dt className="col-sm-5 mb-2">Presidential Era</dt>
                          <dd className="col-sm-7">{selectedMarker.presidential_period?.period_name}</dd>

                          <dt className="col-sm-5 mb-2">Governorate</dt>
                          <dd className="col-sm-7">{selectedMarker.city?.city_name}</dd>

                        </dl>
                        <div className="row">
                          <div className="col-md-6">
                            <button onClick={() => seeMoreClick(selectedMarker.post_id)} className="fw-bold bg-btn w-100">See More   <i className="fa-solid fa-circle-chevron-right"></i></button>
                          </div>
                          <div className="col-md-6">
                            <a href={`https://www.google.com/maps/place/${selectedMarker.latitude},${selectedMarker.longtude}`}><button className="dir-btn w-100">Get Directions   <i className="fa-solid fa-circle-chevron-right"></i></button></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
        
      </APIProvider>

     
    </>
  );
}

export default GMap;
