import React from 'react'
import './Communities.css'
import community1 from '../../assets/Community1.webp'
import community2 from '../../assets/Community2.webp'
import community3 from '../../assets/Community3.webp'
import community4 from '../../assets/Community4.webp'

const Communities = () => {
  return (
<div className = 'communities-container'>
<div className='communities-text'>
<h1>OUR COMMUNITIES</h1>
</div>
    <div className='communities'>
      <div className='community'>
        <img src={community1} alt="Graduation program image" />
        <div className="caption">
          <h2>EDGEWATER</h2>
          <p>EXPLORE LISTING &nbsp;&#8640;</p> 
        </div>
      </div>
      <div className='community'>
        <img src={community2} alt="Masters program image" />
        <div className="caption">
          <h2>FORT LEE</h2>
          <p>EXPLORE LISTING &nbsp;&#8640;</p> 
        </div>
      </div>
      <div className='community'>
        <img src={community3} alt="Post Graduation program image" />
        <div className="caption">
          <h2>PALISADE PARK</h2>
          <p>EXPLORE LISTING &nbsp;&#8640;</p> 
        </div>
      </div>
      <div className='community'>
        <img src={community4} alt="Post Graduation program image" />
        <div className="caption">
          <h2>CLIFFSIDE PARK</h2>
          <p>EXPLORE LISTING &nbsp;&#8640;</p> 
        </div>
      </div>
    </div>

    <button className="btn2">View All</button>
  </div>
  );
};

export default Communities
