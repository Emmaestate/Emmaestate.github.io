import React from 'react'

const DemographicStats = ({
  state = '',
  town = '',
  totalPopulation = 0,
  populationDensity = '',
  medianAge = '',
  malePopulation = '',
  femalePopulation = '',

  populationAge0To9 = 0,
  populationAge10To17 = 0,
  populationAge18To24 = 0,
  populationAge25To64 = 0,
  populationAge65To74 = 0,
  populationAge75Plus = 0,

  educationLessThan9th = 0,
  educationAssociate = 0,
  educationBachelorOrHigher = 0,
}) => {
  return (
    <div>
      <h1>Demographics & Employment Data for {town}, {state}</h1>
      <p>Data provided by the U.S. Census Bureau. {totalPopulation?.toLocaleString()} people call {town} home. The population density is {populationDensity} and the largest age group is between adasdashgdbashdvbashjda. Data provided by the U.S. Census Bureau.</p>
    </div>
  )
}

export default DemographicStats
