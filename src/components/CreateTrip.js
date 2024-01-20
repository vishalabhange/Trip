import React, { useState } from 'react';
import hotelImage1 from '../assests/hotel-img1.jpg'; // Adjust the path accordingly
import hotelImage2 from '../assests/hotel-img2.jpg';
import hotelImage3 from '../assests/hotel-img3.jpg';
import Header from './Header';
import GoogleSearch from "../components/GoogleSearch"


const Hotel = ({ name, price, location, image, onSelect }) => {
    return (
      <div className='hotel'>
      <img src={image} alt={name} onClick={onSelect} className='hotel-image' style={{ width: '180px', height: '150px', borderRadius: '10px' }} />
      <h3>{name}</h3>
        <h3>{name}</h3>
        <p>Price: ${price} per night</p>
        <p>Location: {location}</p>
        <button onClick={onSelect}>Select Hotel</button>
      </div>
  );
};

const CreateTrip = () => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [numNights, setNumNights] = useState(1);
    const [includeBreakfast, setIncludeBreakfast] = useState(false);
  
    const hotels = [
      {
        id: 1,
        name: 'Hotel A',
        price: 100,
        location: 'City X',
        image: hotelImage1,
      },
      {
        id: 2,
        name: 'Hotel B',
        price: 120,
        location: 'City Y',
        image: hotelImage2,
      },
      {
        id: 3,
        name: 'Hotel C',
        price: 90,
        location: 'City Z',
        image: hotelImage3,
      },
    ];
  
    const handleHotelSelect = (hotelId) => {
      const hotel = hotels.find((h) => h.id === hotelId);
      setSelectedHotel(hotel);
    };
  
    const handleNumNightsChange = (e) => {
      setNumNights(parseInt(e.target.value, 10));
    };
  
    const handleIncludeBreakfastChange = () => {
      setIncludeBreakfast(!includeBreakfast);
    };
  
    return (
      <>
      <GoogleSearch/>
      {/* <Header/> */}
      <div className='create-trip'>
        <h2>Hotels</h2>
        <div className='hotel-list'>
          {hotels.map((hotel) => (
            <Hotel
              key={hotel.id}
              name={hotel.name}
              price={hotel.price}
              location={hotel.location}
              image={hotel.image}
              onSelect={() => handleHotelSelect(hotel.id)}
            />
          ))}
        </div>
        {selectedHotel && (
          <div className='selected-hotel'>
            <h3>Selected Hotel</h3>
            <img src={selectedHotel.image} alt={selectedHotel.name} />
            {Object.entries(selectedHotel).map(([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </p>
            ))}
            <div className='options'>
              <label>
                Number of Nights:
                <input
                  type='number'
                  min='1'
                  value={numNights}
                  onChange={handleNumNightsChange}
                />
              </label>
              <label>
                Include Breakfast:
                <input
                  type='checkbox'
                  checked={includeBreakfast}
                  onChange={handleIncludeBreakfastChange}
                />
              </label>
            </div>
          </div>
        )}
      </div>
      </>
    );
  };
  
  export default CreateTrip;