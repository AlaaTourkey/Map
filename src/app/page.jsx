'use client';

import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Filter from './_components/Filter/page';


const Map = dynamic(() => import('../app/_components/Map/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});


export default function Home() {
  const path = usePathname();
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://smap.egyclimate.net/api/schools");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data } = await response.json();
        setMarkers(data);
        setFilteredMarkers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
      
  const handleFilterApply = (filteredData) => {
    const newMarkers = filteredData.map(item => ({
      latitude: item.latitude,
      longtude: item.longtude
    }));
    setFilteredMarkers(newMarkers);
  };

  const handleFilterClear = () => {
    setFilteredMarkers(markers); // Reset to original markers
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }


  const toggleFilter = () => {
    setShowFilter(prev => !prev);
  };
  return (
    <div>
      <Head>
        <title>My Next.js App with Google Maps</title>
        <meta name="description" content="Next.js app with Google Maps integration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main-comp '>
        <Map key={path} markers={filteredMarkers} onApply={handleFilterApply}  onFilterClear={handleFilterClear}  />
        
        
        <div>
          <button onClick={toggleFilter} className='toggle-btn'>
            <i className="fa fa-filter mx-1"></i> Filter
          </button>
        </div>


        {showFilter && (
        <div className="sidebar-left">
          <Filter onClose={() => setShowFilter(false)} onApply={handleFilterApply} onClear={handleFilterClear} />
        </div>
      )}
      </main>
    </div>
  );
}
