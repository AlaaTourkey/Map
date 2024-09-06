'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import '@fortawesome/fontawesome-free/css/all.min.css';

const containerStyle = {
  width: '100%',
  height: '50vh',
  position: 'relative',
};
const center = {
  lat: 30.0444,
  lng: 31.2357,
};

export default function SchoolProfile({ params }) {
  const { post_id } = params;
  const [schoolDetails, setSchoolDetails] = useState({});

  useEffect(() => {
    async function fetchSchoolDetails() {
      try {
        let { data } = await axios.get(`https://smap.egyclimate.net/api/schools/${post_id}?lang_id=1`);
        setSchoolDetails(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching school details:', error);
      }
    }
    fetchSchoolDetails();
  }, [post_id ]);


  return <>
    <div className='content'>
        <div className="container mt-3 w-75 ">
        <div className='row my-5'>
          <div className="col">
            <h1 className='mb-3 fw-bold'>{schoolDetails.title}</h1>
            <img src={schoolDetails.image_url}  className=" w-100 card-img-top" alt="..."/>
            <button className='d-inline-block button outline'>Location on the map  <i class="fa fa-chevron-circle-down mx-1" aria-hidden="true"></i></button>
          </div>
        </div>
        <div className="row p-1">
          <div className="col-md-4 my-1">
            <div>
              <h6 className='fw-bold text-muted'>Type</h6>
              <h3>{schoolDetails?.type?.name}</h3>
            </div>
          </div>
          <div className="col-md-4 my-1">
          <h6 className='fw-bold text-muted'>Classification</h6>
              <h3>{schoolDetails?.school_type?.name}</h3>
          </div>
          
          <div className="col-md-4 my-1">
          <h6 className='fw-bold text-muted'>Sector</h6>
          <h3 className='w-75'>{schoolDetails?.educational_administration?.description}</h3>
          </div>
          <hr />
        </div>
        <div className="row p-1">
          <div className="col-md-4 my-1">
            <div>
              <h6 className='fw-bold text-muted'>Governorate</h6>
              <h3>{schoolDetails?.city?.city_name}</h3>
            </div>
            
          </div>
          <div className="col-md-4 my-1">
          <h6 className='fw-bold text-muted'>Presidential Era</h6>
              <h3>{schoolDetails?.presidential_period?.period_name}</h3>
          </div>
          
          <div className="col-md-4 my-1">
          <h6 className='fw-bold text-muted'>Establishment Date</h6>
          <h3 className='w-75'>{schoolDetails?.establishment_date_string}</h3>
          </div>
          <hr />
        </div>
        <div className="row p-1">
          <div className="col-md-4 my-1">
            <div>
              <h6 className='fw-bold text-muted'>Phone Number</h6>
              <h3>{schoolDetails?.phone}</h3>
            </div>
            
          </div>
          <div className="col-md-4 my-1">
          <h6 className='fw-bold text-muted'>Postal Code</h6>
              <h3>{schoolDetails?.postal_account}</h3>
          </div>
          
          <div className="col-md-4 my-1">
          <h6 className='fw-bold text-muted'>Number of Current Students</h6>
          <h3 className='w-75'>{schoolDetails?.students_count}</h3>
          </div>
          <hr />
        </div>

    <div className="row mb-5">
      <div className="col-md-10 offset-md-1 mb-3">
        <h1>Activities</h1>
        {Array.isArray(schoolDetails.activity) && schoolDetails.activity.length > 0 ? (
                schoolDetails.activity.map((active, index) => (
                  <div key={active.id}>
                    <ul className='text-muted'>
                      <li>{active.act_name}</li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No activities available.</p>
              )}

       
      </div>
    </div>

    <div className="row mb-5">
      <div className="col-md-10 offset-md-1 mb-3">
        <h1>Activities</h1>
        {Array.isArray(schoolDetails.violations) && schoolDetails.violations.length > 0 ? (
                schoolDetails.violations.map((viola, index) => (
                  <div key={viola.id}>
                    <ul className='text-muted'>
                      <li>{viola.name}</li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No activities available.</p>
              )}

       
      </div>
    </div>

    <div className="row mb-5">
      <div className="col-md-10 offset-md-1 mb-3">
        <h1>About school</h1>
        <h6 className='text-muted'>{schoolDetails.description}</h6>
      </div>
    </div>

                 <div className='row mb-4'>
                    <div className="col-md-10 offset-md-1">
                        <h1 className='mb-2'>Geolocation</h1>
                        <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <div style={containerStyle}>
          <Map defaultZoom={7} defaultCenter={center}>
              <Marker position={{ lat: schoolDetails.latitude, lng: schoolDetails.longtude}} />
          </Map>
        </div>
                        </APIProvider>
                        <a href={`https://www.google.com/maps/place/${schoolDetails.latitude},${schoolDetails.longtude}`}><button className='d-inline-block button'>Get Directions  <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></button></a>  
                    </div>  
                </div>

      </div>
    </div>
  </>
    
}
