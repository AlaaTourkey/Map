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
  const {student_id } = params;
  const [studentDetails, setstudentDetails] = useState({});

  useEffect(() => {
    async function fetchSchoolDetails() {
      try {
        let { data } = await axios.get(`https://smap.egyclimate.net/api/schools/students/show/${student_id}?lang_id=1`);
        setstudentDetails(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching school details:', error);
      }
    }

    fetchSchoolDetails();
  }, [student_id ]);


  return <>
    <div className="content p-3">
        <div className="container w-75">
            <div className="row mb-3 align-items-end">
                <div className="col-md-6 my-4">
                <img src={studentDetails.image_url} className="w-100 card-img-top" alt={studentDetails.name} />
                </div>
                <div className="col-md-6 pb-5">
                    <h1 className='fw-bold'>{studentDetails.name}</h1>
                    <p className='text-muted fw-bold'>{studentDetails.birthday_date_string}</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <div className='mb-2'>
                        <h5 className='text-muted'>Gender</h5>
                        <h3>{studentDetails.gender}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='mb-2'>
                        <h5 className='text-muted'>School</h5>
                        <h3>{studentDetails.school?.title}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='mb-2'>
                        <h5 className='text-muted'>status</h5>
                        <h3>{studentDetails.status ? studentDetails.status : "-"}</h3>
                    </div>
                </div>
            </div>
            <hr className='mb-3' />
            <div className="row mt-4 align-items-center ">
                <div className="col-md-4 m-0">
                    <div className='m-0'>
                        <h5 className='text-muted'>Graduation Date</h5>
                        <h3>{studentDetails.graduation_date_string}</h3>
                    </div>
                </div>
                <div className="col-md-4 m-0 ">
                    <div className='m-0'>
                        <h5 className='text-muted'>Latest Update</h5>
                        <h3>{studentDetails.latest_update_string}</h3>
                    </div>
                </div>
            </div>
            <hr className='mb-5' />
                    <div>
                <div className="row mb-4">
                    <div className='col-md-10 offset-md-1'>
                    <h1>Background Information</h1>
                    <p className='text-muted'>
                        {studentDetails.background_information}
                    </p>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className='col-md-10 offset-md-1 my-5'>
                    <h1 >School Information</h1>
                    <div className="row my-3">
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <h6 className='text-muted fw-bold'>Phone Number</h6>
                                <h5>{studentDetails.school?.phone}</h5>
                            </div>
                        </div>
                        <div className="col-md-4">
                        <div className='mb-2'>
                                <h6 className='text-muted fw-bold'>Postal Code</h6>
                                <h5>{studentDetails.school?.postal_account}</h5>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col">
                        <div className='mb-2'>
                                <h6 className='text-muted fw-bold'>Time of Visits</h6>
                                {Array.isArray(studentDetails.school?.visits) && studentDetails.school?.visits.length > 0 ? (
                studentDetails.school?.visits.map((visit, index) => (
                  <div key={visit.id}>
                    <h5>{`${visit.day_name}: ${visit.from}AM -${visit.to}AM `}</h5>
                  </div>
                ))
              ) : (
                <p>No visits.</p>
              )}
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="row">
                        <div className="col mt-5">
                        <div className='mt-5'>
                                <h1>Violations Reported</h1>
                                {Array.isArray(studentDetails.school?.violations) && studentDetails.school?.violations.length > 0 ? (
                studentDetails.school?.violations.map((violation, index) => (
                  <div key={violation.violation_id}>
                    <ul className='text-muted'>
                        <li>
                            {violation.name}
                        </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No visits.</p>
              )}
                            </div>
                        </div>
                </div>
                    
                    </div> 
                </div>
                <div className='row mb-4'>
                    <div className="col-md-10 offset-md-1">
                        <h1 className='mb-2'>Geolocation</h1>
                        <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <div style={containerStyle}>
          <Map defaultZoom={7} defaultCenter={center}>
              <Marker position={{ lat: studentDetails.school?.latitude, lng: studentDetails.school?.longtude}} />
          </Map>
        </div>
                        </APIProvider>
                       <a href={`https://www.google.com/maps/place/${studentDetails.school?.latitude},${studentDetails.school?.longtude}`} ><button className='d-inline-block button'>Get Directions  <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></button></a>  
                    </div>  
                </div>
                    </div>
                
                   
        </div>
    </div>
  </>
    
}
