import logo from '../../../assets/images/logo.png'
import Image from 'next/image';
import styles from './page.module.css'
import Link from 'next/link';



export default function Footer() {
  return <>
    <footer className={`pt-5  ${styles.bg_Color}`}>
      <div className="container">
        <div className="row g-4 m-0">
          <div className='col-md-6' >
            <div>
              <Image src={logo} alt="logo" />
              <p className={`my-4 w-75 talk-para ${styles.colr}`} >We are always open to discuss your project and improve your online presence.</p>
            </div>

          </div>

          <div className='col-md-6  talk'>
            <h1 className='text-white talk-header'>Let's Talk</h1>
            <p className={`my-3 talk-para ${styles.colr}`}>We are always open to discuss your project, improve your online presence and help with your UX/UI design challenges.</p>
            <div className={styles.colr}>
              <i className="fa-brands fa-facebook fa-lg me-3"></i>
              <i className="fa-brands fa-twitter fa-lg me-3 "></i>
              <i className="fa-brands fa-instagram fa-lg me-3"></i>
              <i className="fa-brands fa-linkedin fa-lg me-3"></i>
            </div>
          </div>

          <div className='col-md-6 talk-info'>
            <div className="row" style={{ background: '#fcd980' }}>
              <div className='col-6 '>
                <h5 className='m-0'>Email us at</h5>
                <p className='m-0'>info@schoolsmap.com</p>
              </div>
              <div className="col-6 ">
                <h5 className='m-0'>Call us</h5>
                <p className='m-0'>0927 6277 28525</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </footer>
    <div className="container">

    <div className='row py-4 m-0 d-flex justify-content-center align-items-center'>
      <div className='col-md-6  '>
        <p className='fw-bold  m-0'>Copyright 2022, schoolsmap.com</p>
      </div>
      <nav className='navbar navbar-expand-lg col-md-6'> 
        <div className=" py-1">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mx-5 mb-lg-0">

              <li className="nav-item mx-1">
                <Link className={`nav-link fw-bold`} aria-current="page" href="/">Home</Link>
              </li>

              <li className="nav-item mx-1">
                <Link className={`nav-link fw-bold`} aria-current="page" href="/schools">Schools</Link>
              </li>

              <li className="nav-item mx-1">
                <Link className={`nav-link fw-bold`} aria-current="page" href="/students">Students</Link>
              </li>

              <li className="nav-item mx-1">
                <Link className={`nav-link fw-bold`} aria-current="page" href="/about">About Us</Link>
              </li>

              <li className="nav-item mx-3">
                <Link className={`nav-link fw-bold`} aria-current="page" href="/contact">ContactUs</Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>

    </div>
    </div>


  </>
}