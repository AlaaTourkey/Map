'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css'


export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedSchool, setSelectedSchool] = useState("All");
  const router = useRouter();




  async function fetchDataStudent() {
    try {
      const { data } = await axios.get("https://smap.egyclimate.net/api/schools/students/list");
      setStudents(data.data);
      console.log(data.data)
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  useEffect(() => {
    fetchDataStudent();
  }, []);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleSchoolChange = (school) => {
    setSelectedSchool(school);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearchTerm = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender === "All" || student.gender === selectedGender;
    const matchesSchool = selectedSchool === "All" || student.school?.title === selectedSchool;

    return matchesSearchTerm && matchesGender && matchesSchool;
  });

  const handleSeeMoreClickStudent = (studentId) => {
    router.push(`/studentProfile/${studentId}`);
  };

  return (
    <>
      <div className="bg-body-secondary text-center m-auto p-5 ">
        <h6 className="text-muted">What we created</h6>
        <h1 className="page-header">Students List</h1>
        <h6 className="page-para w-75 m-auto">
          We help teams create great digital products by providing them with tools and technology to make the design-to-code process universally accessible.
        </h6>
      </div>

      <div className="container w-75 mx-auto">
        <div className="row justify-content-between align-items-center pt-4 my-4">
          <div className="col-md-6">
            <div className="row justify-content-start align-items-center">
              <div className="col-md-4">
                <Dropdown>
                  <Dropdown.Toggle variant="white" id="dropdown-basic" className="rounded-4 my-2 shadow">
                    <i className="fa-regular fa-user"></i> <span className="fw-light">Gender</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleGenderChange("All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleGenderChange("male")}>Male</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleGenderChange("female")}>Female</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="col-md-4">
                <Dropdown>
                  <Dropdown.Toggle variant="white" id="dropdownMenuSchools" className="rounded-4 my-2 shadow">
                    <i className="fa-solid fa-school"></i> <span className="fw-light">Search for schools</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSchoolChange("All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSchoolChange("Gamal Abdelbaser School")}>
                      Gamal Abdelbaser School
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSchoolChange("Alex School")}>Alex School</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <input
              type="search"
              className="form-control rounded-4 p-2 shadow-lg"
              placeholder="Search for student"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gy-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="student-card card pb-4">
                <img src={student.image_url} height={250} className="w-100 card-img-top" alt={student.name} />
                <hr />
                <div className="card-body row">
                  <div className="col d-flex flex-column">
                    <h3 className="card-title h5">{student.name}</h3>
                    <p className="card-text text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui....
                    </p>

                    <dl className="row mt-auto">
                      <dt className="col-sm-5 mb-2">Type</dt>
                      <dd className="col-sm-7">{student.gender}</dd>

                      <dt className="col-sm-5 mb-2">School</dt>
                      <dd className="col-sm-7">{student.school?.title ? student.school.title : '-'}</dd>

                      <dt className="col-sm-5 mb-2">Date of Birth</dt>
                      <dd className="col-sm-7">{student.birthday_date_string}</dd>
                    </dl>

                    <div className="row">
                      <div className="col-md-12">
                        <button
                          onClick={() => handleSeeMoreClickStudent(student.student_id)}
                          className="fw-bold bg-btn w-100 rounded-0"
                        >
                          See More <i className="fa-solid fa-circle-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  );
}
