'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css'
import GMap from '../_components/Map/page.jsx';


export default function Schools() {

  const [School, setSchool] = useState([]);
  const router = useRouter();

  async function fetchData() {
    let { data } = await axios.get("https://smap.egyclimate.net/api/schools")
    console.log(data.data)
    setSchool(data.data)

  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSeeMoreClick = (schoolId) => {
    router.push(`/schoolProfile/${schoolId}`);

  };

  return <>
    <div className="container p-4">
      <div className="row gx-4">
        {School.map((school, index) => <div key={index} className="card col-12  col-md-4 my-3 p-0" >
          <div>
            <img src={school.image_url} height={200} className=" object-fit-cover w-100 card-img-top" alt="..." />
            <hr className="m-0" />

            <div className="card-body row">
              <div className="col d-flex flex-column">
                <h3 className="card-title h5 ">{school.title}</h3>
                <p className="card-text text-muted">{school.description}</p>

                <dl class="row mt-auto">

                  <dt class="col-sm-5 mb-2">Type</dt>
                  <dd class="col-sm-7">{school.type.name}</dd>

                  <dt class="col-sm-5 mb-2">Classification</dt>
                  <dd class="col-sm-7">{school.school_type.name}</dd>

                  <dt class="col-sm-5 mb-2">Sector</dt>
                  <dd class="col-sm-7">{school.educational_administration.description}</dd>

                  <dt class="col-sm-5 mb-2">Presidential Era</dt>
                  <dd class="col-sm-7">{school.presidential_period.period_name}</dd>

                  <dt class="col-sm-5 mb-2">Governorate</dt>
                  <dd class="col-sm-7">{school.city.city_name}</dd>

                </dl>
                <div className="row">
                  <div className="col-md-6">
                    <button onClick={() => handleSeeMoreClick(school.post_id)} className="fw-bold bg-btn w-100">See More   <i class="fa-solid fa-circle-chevron-right"></i></button>
                  </div>
                  <div className="col-md-6">
                    <a href={`https://www.google.com/maps/place/${school.latitude},${school.longtude}`}><button className="dir-btn w-100">Get Directions <i class="fa-solid fa-circle-chevron-right"></i></button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>

  </>
}