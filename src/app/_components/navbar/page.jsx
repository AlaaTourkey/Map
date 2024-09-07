'use client'
import Link from "next/link"
import Image from 'next/image';
import logo from '../../../assets/images/logo.png'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePathname } from "next/navigation";
import { NavLink } from "react-bootstrap";

export default function Navbar() {
  let pathName = usePathname();

  return <>
    <nav className={`navbar navbar-expand-lg py-3  ${styles.bg_Color}`}>
      <div className="container-fluid px-5 ">
        <Image src={logo} alt="logo.schools" />
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mx-4 mb-2 mb-lg-0">

            <li className="nav-item mx-2">
              <Link className={`nav-link   fw-bold ${pathName === '/' ? "active" : ""}`} aria-current="page" href="/">Home</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className={`nav-link   fw-bold ${pathName === '/schools' ? "active" : ""}`} aria-current="page" href="/schools">Schools</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className={`nav-link   fw-bold ${pathName === '/students' ? "active" : ""}`} aria-current="page" href="/students">Students</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className={`nav-link   fw-bold ${pathName === '/about' ? "active" : ""}`} aria-current="page" href="/about">About Us</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className={`nav-link   fw-bold ${pathName === '/contact' ? "active" : ""}`} aria-current="page" href="/contact">ContactUs</Link>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  </>
}