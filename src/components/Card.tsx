import React from "react";

import "./Card.scss";

interface CardProps {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

const Card: React.FC<CardProps> = ({
  flag,
  name,
  population,
  region,
  capital,
}) => {
  return (
    <div className="country-card">
      <img src={flag} alt="" className="country-flag" />
      <div className="country-card-body">
        <h2 className="country-name">{name}</h2>
        <p>
          <span>Population: </span>
          <span>{population}</span>
        </p>
        <p>
          <span>Region: </span>
          <span>{region}</span>
        </p>
        {capital && (
          <p>
            <span>Capital: </span>
            <span>{capital}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
