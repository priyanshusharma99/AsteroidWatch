import React, { useEffect, useState } from 'react'

const Data = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api_key = "exHgfVLy90y0PLc75x1XBuwaHmv3x4u3MojRnLZU"
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-06-01&end_date=2024-06-07&api_key=${api_key}`);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>{data ? JSON.stringify(data) : "Loading..."}</div>
  )
}

export default Data 