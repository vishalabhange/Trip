// showcase.js
import React from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import Destinations from './Destinations';
import CreateTrip from './CreateTrip';


const Showcase = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <section className='showcase'>
      <div className='showcase-overlay'>
        <h1>Showcase Travel Agency</h1>
        <p>
          Get to tour the world in style. Select a destination, book your
          flight, and off you go!
        </p>
        
        
      </div>
    </section>
    <Destinations/>
    <CreateTrip/>
    </>
  );
};

export default Showcase;

