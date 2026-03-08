import React, { useEffect, useState } from 'react';
import axios from 'axios';

const neighborhoods = [
  {
    id: '1',
    name: 'Fort Lee',
    state: 'NJ',
    path: 'fortlee',
    lat: 40.8509,
    lon: -73.9701,
    image: 'tempImg',
    description: 'Perched along the Hudson River...',
    fips: { state: '34', place: '25190' }
  },
  // Add more towns here with lat/lon/fips
];

const NeighborhoodData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const CENSUS_KEY = process.env.REACT_APP_CENSUS_KEY;
  const WALK_KEY = process.env.REACT_APP_WALK_KEY;
  const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;

  const fetchCensus = async (fips) => {
    const vars = [
      'DP05_0001E', // total population
      'DP05_0018E', // median age
      'DP03_0062E'  // median household income
    ].join(',');
    const url = `https://api.census.gov/data/2023/acs/acs5/profile?get=${vars}&for=place:${fips.place}&in=state:${fips.state}&key=${CENSUS_KEY}`;
    const res = await axios.get(url);
    const [header, values] = res.data;
    return {
      totalPopulation: values[0],
      medianAge: values[1],
      averageIncome: values[2]
    };
  };

  const fetchWalkScore = async (lat, lon, address) => {
    const res = await axios.get('https://api.walkscore.com/score', {
      params: {
        format: 'json',
        lat,
        lon,
        address,
        wsapikey: WALK_KEY,
        transit: 1,
        bike: 1
      }
    });
    return {
      walkScore: res.data.walkscore,
      transitScore: res.data.transit?.score || null,
      bikeScore: res.data.bike?.score || null
    };
  };

  const fetchPlaces = async (lat, lon, type) => {
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lon}`,
        radius: 2000,
        type,
        key: GOOGLE_KEY
      }
    });
    return res.data.results.map((place) => ({
      Name: place.name,
      Link: `https://maps.google.com/?cid=${place.place_id}`,
      Miles: 1.2, // or compute from geometry
      Reviews: place.user_ratings_total,
      Rating: place.rating
    }));
  };

  const enrichTown = async (town) => {
    const [census, walk, restaurants, shopping, beauty, nightlife, schools] = await Promise.all([
      fetchCensus(town.fips),
      fetchWalkScore(town.lat, town.lon, `${town.name}, ${town.state}`),
      fetchPlaces(town.lat, town.lon, 'restaurant'),
      fetchPlaces(town.lat, town.lon, 'shopping_mall'),
      fetchPlaces(town.lat, town.lon, 'beauty_salon'),
      fetchPlaces(town.lat, town.lon, 'bar'),
      fetchPlaces(town.lat, town.lon, 'school'),
    ]);
    return { ...town, ...census, ...walk, restaurants, shopping, beauty, nightlife, schools };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const enriched = await Promise.all(neighborhoods.map(enrichTown));
        setData(enriched);
      } catch (err) {
        console.error('Failed to load neighborhood data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Loading data...</div>;

  return (
    <div>
      {data.map((n) => (
        <div key={n.id}>
          <h2>{n.name}</h2>
          <p>{n.description}</p>
          <ul>
            <li>Population: {n.totalPopulation}</li>
            <li>Median Age: {n.medianAge}</li>
            <li>Income: ${n.averageIncome}</li>
            <li>Walk Score: {n.walkScore}</li>
            <li>Transit Score: {n.transitScore}</li>
            <li>Bike Score: {n.bikeScore}</li>
          </ul>
          <h4>Top Restaurants:</h4>
          <ul>
            {n.restaurants.slice(0, 3).map((r, i) => (
              <li key={i}><a href={r.Link} target="_blank" rel="noreferrer">{r.Name}</a> – {r.Rating} stars</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NeighborhoodData;
