import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RentalSpace = () => {
  const { id } = useParams();
  const [rentalSpace, setRentalSpace] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/test/viewrentalspace/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRentalSpace(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!rentalSpace) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={rentalSpace.rentalSpace.image}
            alt="Rental Space"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1>{rentalSpace.name}</h1>
          <p className="text-muted">{rentalSpace.rentalSpace.location}</p>
          <p className="text-primary">${rentalSpace.rentalSpace.Price}</p>
          <p>{rentalSpace.rentalSpace.Description}</p>
          <p>
            Size: {rentalSpace.rentalSpace.size} Sq. Yard
            <br />
            Has Outdoor Space:{" "}
            {rentalSpace.rentalSpace.hasOutdoorSpace ? "Yes" : "No"}
            <br />
            Catering Included:{" "}
            {rentalSpace.rentalSpace.cateringIncluded ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentalSpace;
