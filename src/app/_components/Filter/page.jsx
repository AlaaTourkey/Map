"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Filter({ onClose, onApply, onClear }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedViolations, setSelectedViolations] = useState([]);

  const [classificationData, setClassificationData] = useState([]);
  const [typeSchool, setTypeSchool] = useState([]);
  const [cities, setCities] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [activities, setActivities] = useState([]);
  const [violations, setViolations] = useState([]);


  const [showContainer, setshowContainer] = useState(true);
  const [showClassificationList, setShowClassificationList] = useState(false);
  const [showTypeSchoolList, setShowTypeSchoolList] = useState(false);
  const [showCitiesList, setShowCitiesList] = useState(false);
  const [showSectorsList, setShowSectorsList] = useState(false);
  const [showPeriodsList, setShowPeriodsList] = useState(false);
  const [showActivitiesList, setShowActivitiesList] = useState(false);
  const [showViolationsList, setShowViolationsList] = useState(false);


  async function fetchData(apiUrl, setData) {
    try {
      const { data } = await axios.get(apiUrl);
      console.log(data)
      setData(data);
    } catch (error) {
      console.error(`Error fetching data from ${apiUrl}:`, error);
    }
  }


  useEffect(() => {
    fetchData("https://smap.egyclimate.net/api/schools/types/list?lang_id=1", setClassificationData);
  }, []);

  useEffect(() => {
    fetchData("https://smap.egyclimate.net/api/schools/school_type?lang_id=1", setTypeSchool);
  }, []);

  useEffect(() => {
    fetchData("https://smap.egyclimate.net/api/cities?lang_id=1", setCities);
  }, []);

  useEffect(() => {
    fetchData("https://smap.egyclimate.net/api/sectors?lang_id=1", setSectors);
  }, []);

  useEffect(() => {
    fetchData("https://smap.egyclimate.net/api/periods?lang_id=1", setPeriods);
  }, []);

  useEffect(() => {
    fetchData("https://smap.egyclimate.net/api/schools/activities/all?lang_id=1", setActivities);
  }, []);

  useEffect(() => {
    fetchData("https://smap.egyclimate.net/api/violations?lang_id=1", setViolations);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilter = async () => {
    const apiUrl = `https://smap.egyclimate.net/api/schools`

    try {
      const { data } = await axios.get(apiUrl, {
        params: {
          paginate: 'false',
          search: searchTerm,
          city: selectedCity || '',
          place: selectedSector || '',
          period: selectedPeriod || '',
          school_type: selectedType || '',
          school_category: selectedClassification || '',
          activity_id: selectedActivities.join(",") || '',
          violation_id: selectedViolations.join(",") || '',
          lang_id: '1'
        }
      });
      onApply(data.data); // Pass filtered data to parent 

    } catch (error) {
      console.error("Error fetching filtered data: ", error);
    }

  };
  const handleClearFilter = () => {
    setSelectedClassification("");
    setSelectedType("");
    setSelectedCity("");
    setSelectedSector("");
    setSelectedPeriod("");
    setSelectedActivities([]);
    setSelectedViolations([]);
    setSearchTerm("");
    if (typeof onClear === 'function') {
      onClear(); // Notify parent component to reset data
    } else {
      console.error('onClear is not a function');
    } // Notify parent component to reset data
  };


  return <>

    <div>
      <span
        type="button"
        className="close-btn"
        aria-label="Close"
        onClick={onClose}
      > <i className="fa-solid fa-xmark"></i> </span>
      <div className="container">
        <div className="scrollable-text">

          <div className="search-bar">
            <input type="text"
              placeholder="Search For Schools"
              className="search-input form-control"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <i className="fa fa-search search-icon"></i>
          </div>
          {/* School Classification */}
          <div className="allLists">
            <div>
              <div className="headerList">
                <button
                  className="listBtn"
                  onClick={() => setShowClassificationList(!showClassificationList)}
                >
                  School Classification{" "}
                  <span>
                    <i className="fa-regular fa-rectangle-list"></i>
                  </span>
                </button>
              </div>
              {showClassificationList && (
                <div className="dropdownlist py-3">
                  {classificationData.map((item) => (
                    <div key={item.id}>
                      <input
                        type="radio"
                        id={`classification_${item.id}`}
                        name="classification"
                        value={item.id}
                        checked={selectedClassification === item.id}
                        onChange={() => setSelectedClassification(item.id)}
                      />
                      <label htmlFor={`classification_${item.id}`}>
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* School Type */}
          <div className="allLists">
            <div>
              <div className="headerList">
                <button
                  className="listBtn"
                  onClick={() => setShowTypeSchoolList(!showTypeSchoolList)}
                >
                  School Type{" "}
                  <span>
                    <i className="fa-solid fa-venus-mars"></i>
                  </span>
                </button>
              </div>
              {showTypeSchoolList && (
                <div className="dropdownlist py-3">
                  {typeSchool.map((item) => (
                    <div key={item.id}>
                      <input
                        type="radio"
                        id={`typeSchool_${item.id}`}
                        name="typeSchool"
                        value={item.id}
                        checked={selectedType === item.id}
                        onChange={() => setSelectedType(item.id)}
                      />
                      <label htmlFor={`typeSchool_${item.id}`}>
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Cities */}
          <div className="allLists">
            <div>
              <div className="headerList">
                <button
                  className="listBtn"
                  onClick={() => setShowCitiesList(!showCitiesList)}
                >
                  Cities{" "}
                  <span>
                  <i className="fa-solid fa-city"></i>
                  </span>
                </button>
              </div>
              {showCitiesList && (
                <div className="dropdownlist py-3">
                  {cities.map((item) => (
                    <div key={item.id}>
                      <input
                        type="radio"
                        id={`cities_${item.id}`}
                        name="cities"
                        value={item.id}
                        checked={selectedCity === item.id}
                        onChange={() => setSelectedCity(item.id)}
                      />
                      <label htmlFor={`cities_${item.id}`}>
                        {item.city_name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Sectors */}
          <div className="allLists">
            <div>
              <div className="headerList">
                <button
                  className="listBtn"
                  onClick={() => setShowSectorsList(!showSectorsList)}
                >
                  Sectors{" "}
                  <span>
                  <i className="fa-solid fa-users-between-lines"></i>
                  </span>
                </button>
              </div>
              {showSectorsList && (
                <div className="dropdownlist py-3">
                  {sectors.map((item) => (
                    <div key={item.id}>
                      <input
                        type="radio"
                        id={`sectors_${item.id}`}
                        name="sectors"
                        value={item.id}
                        checked={selectedSector === item.place_id}
                        onChange={() => setSelectedSector(item.place_id)}
                      />
                      <label htmlFor={`sectors_${item.id}`}>
                        {item.description}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Periods */}
          <div className="allLists">
            <div>
              <div className="headerList">
                <button
                  className="listBtn"
                  onClick={() => setShowPeriodsList(!showPeriodsList)}
                >
                  Periods{" "}
                  <span>
                  <i className="fa-solid fa-web-awesome"></i>
                  </span>
                </button>
              </div>
              {showPeriodsList && (
                <div className="dropdownlist py-3">
                  {periods.map((item) => (
                    <div key={item.id}>
                      <input
                        type="radio"
                        id={`periods_${item.id}`}
                        name="periods"
                        value={item.id}
                        checked={selectedPeriod === item.period_id}
                        onChange={() => setSelectedPeriod(item.period_id)}
                      />
                      <label htmlFor={`periods_${item.id}`}>
                        {item.period_name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Activities */}
          <div className="allLists">
            <div>
              <div className="headerList">
                <button
                  className="listBtn"
                  onClick={() => setShowActivitiesList(!showActivitiesList)}
                >
                  Activities{" "}
                  <span>
                  <i className="fa-solid fa-person-running"></i>
                  </span>
                </button>
              </div>
              {showActivitiesList && (
                <div className="dropdownlist py-3">
                  {activities.map((item) => (
                    <div key={item.id}>
                      <input
                        type="checkbox"
                        id={`activities_${item.id}`}
                        name="activities"
                        value={item.id}
                        checked={selectedActivities.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedActivities((prev) => [...prev, item.id]);
                          } else {
                            setSelectedActivities((prev) => prev.filter((id) => id !== item.id));
                          }
                        }}
                      />
                      <label htmlFor={`activities_${item.id}`}>
                        {item.act_name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Violations */}
          <div className="allLists">
            <div>
              <div className="headerList">
                <button
                  className="listBtn"
                  onClick={() => setShowViolationsList(!showViolationsList)}
                >
                  Violations{" "}
                  <span>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  </span>
                </button>
              </div>
              {showViolationsList && (
                <div className="dropdownlist py-3">
                  {violations.map((item) => (
                    <div key={item.id}>
                      <input
                        type="checkbox"
                        id={`violations_${item.id}`}
                        name="violations"
                        value={item.id}
                        checked={selectedViolations.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedViolations((prev) => [...prev, item.violation_id]);
                          } else {
                            setSelectedViolations((prev) => prev.filter((violation_id) => violation_id !== item.violation_id));
                          }
                        }}
                      />
                      <label htmlFor={`violations_${item.id}`}>
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button onClick={handleApplyFilter} className="btn applyFilter d-block">Apply Filter</button>
          <button onClick={handleClearFilter} className="btn d-block w-100 text-white fw-bold fs-5"><i className="fa-regular fa-trash-can me-1"></i> Clear Filter</button>
        </div>
      </div>
    </div>
  </>

}
