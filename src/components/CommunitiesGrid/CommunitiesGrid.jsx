import React from 'react';
import FeatureGrid from '../FeatureGrid/FeatureGrid.jsx';
import community1 from '../../assets/Community1.webp';
import community2 from '../../assets/Community2.webp';
import community3 from '../../assets/Community3.webp';
import community4 from '../../assets/Community4.webp';

const communityItems = [
  { image: community1, title: 'EDGEWATER', subtext: 'EXPLORE LISTING →' },
  { image: community2, title: 'FORT LEE', subtext: 'EXPLORE LISTING →' },
  { image: community3, title: 'PALISADE PARK', subtext: 'EXPLORE LISTING →' },
  { image: community4, title: 'CLIFFSIDE PARK', subtext: 'EXPLORE LISTING →' },
];

const CommunitiesSection = () => (
  <FeatureGrid title="OUR COMMUNITIES" items={communityItems} />
);

export default CommunitiesSection;
