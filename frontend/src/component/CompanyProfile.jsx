import React from 'react'

function CompanyProfile({profile}) {
    if (!profile) {
    return <p>Loading company profile...</p>;
    }
  return (
    <div>
        <h2>Company Profile</h2>
        <p>Sector: {profile.sector}</p>
        <p>Industry: {profile.industry}</p>
        <p>Market Cap: {profile.marketCap}</p>
        <p>Employees: {profile.fullTimeEmployees}</p>
        <p>52 Week High: {profile.fiftyTwoWeekHigh}</p>
        <p>52 Week Low: {profile.fiftyTwoWeekLow}</p>
        <p>Website: {profile.website}</p>
        
    </div>
  )
}

export default CompanyProfile;