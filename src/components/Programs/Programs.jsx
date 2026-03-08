import React from 'react';
import './Programs.css';
import community1 from '../../assets/program-1.png';
import community2 from '../../assets/program-2.png';
import community3 from '../../assets/program-3.png';
import program_icon_1 from '../../assets/program-icon-1.png';
import program_icon_2 from '../../assets/program-icon-2.png';
import program_icon_3 from '../../assets/program-icon-3.png';

const Programs = () => {
  return (
    <div className='programs'>
      <div className='program'>
        <img src={community1} alt="Graduation program image" />
        <div className="caption">
          <img src={program_icon_1} alt="Graduation icon" />
          <p>Graduation Degree</p>
        </div>
      </div>
      <div className='program'>
        <img src={community2} alt="Masters program image" />
        <div className="caption">
          <img src={program_icon_2} alt="Masters icon" />
          <p>Masters Degree</p>
        </div>
      </div>
      <div className='program'>
        <img src={community3} alt="Post Graduation program image" />
        <div className="caption">
          <img src={program_icon_3} alt="Post Graduation icon" />
          <p>Post Graduation</p>
        </div>
      </div>
      
    </div>
  );
};

export default Programs;
