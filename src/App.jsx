import React, { useState } from "react";
import "./styles.css";

const Calculator = () => {
  const [isRentSelected, setIsRentSelected] = useState(true);
  const [price, setPrice] = useState(500000);
  const [rent, setRent] = useState(2000);
  const [propertyTax, setPropertyTax] = useState(1.0);
  const [maintenanceCosts, setMaintenanceCosts] = useState(1.0);
  const [downPayment, setDownPayment] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(4.75);
  const [opportunityCostOfDownPayment, setOpportunityCostOfDownPayment] = useState(6.4);
  const [homePriceGrowth, setHomePriceGrowth] = useState(3);

  const calculateFairPrice = (
    rent,
    propertyTax,
    maintenanceCosts,
    downPayment,
    mortgageRate,
    opportunityCostOfDownPayment
  ) => {
    const costOfOwning = calculateCostOfOwning(
      opportunityCostOfDownPayment,
      downPayment,
      mortgageRate,
      propertyTax,
      maintenanceCosts
    );
    const rentPerYear = rent * 12;
    const fairPrice = rentPerYear / costOfOwning;
    return fairPrice;
  };

  const calculateFairRent = (
    price,
    propertyTax,
    maintenanceCosts,
    downPayment,
    mortgageRate,
    opportunityCostOfDownPayment
  ) => {
    const costOfOwning = calculateCostOfOwning(
      opportunityCostOfDownPayment,
      downPayment,
      mortgageRate,
      propertyTax,
      maintenanceCosts
    );
    const fairRent = (price * costOfOwning) / 12;
    return fairRent;
  };

  const calculateCostOfOwning = (
    opportunityCostOfDownPayment,
    downPayment,
    mortgageRate,
    propertyTax,
    maintenanceCosts
  ) => {
    const capitalCost =
      (opportunityCostOfDownPayment / 100) * (downPayment / 100) +
      (mortgageRate / 100) * (1 - downPayment / 100) -
      homePriceGrowth / 100;
    const costOfOwning =
      capitalCost + propertyTax / 100 + maintenanceCosts / 100;
    return costOfOwning;
  };

  return (
    
 <div id="root">
    <div className="calculator-box">
      <div className="calculator-container">
      <header className="header">
          <h1>Rent Vs Buy</h1>
        </header>
        <main className="main">
          <div className="options">
            <input
              type="radio"
              id="rentOption"
              checked={isRentSelected}
              onChange={() => setIsRentSelected(true)}
            />
            <label htmlFor="rentOption">Monthly Rent</label>

            <input
              type="radio"
              id="priceOption"
              checked={!isRentSelected}
              onChange={() => setIsRentSelected(false)}
            />
            <label htmlFor="priceOption">Property Price</label>
          </div>

          <div className="form">
            {isRentSelected ? (
              <div className="form-group">
                <label htmlFor="rent">Monthly Rent($):</label>
                <input
                  id="rent"
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={(event) => setRent(event.target.value)}
                  value={rent ? rent : ""}
                  placeholder="Enter the monthly rent"
                  aria-label="Enter the amount of monthly rent to the nearest dollar"
                  step="100"
                  required
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="price">Property Price</label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={(event) => setPrice(event.target.value)}
                  value={price}
                  placeholder="Enter the property price"
                  aria-label="Enter the price of the property to the nearest dollar"
                  step="10000"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="propertyTax">Property Tax($):</label>
              <input
                id="propertyTax"
                type="number"
                min="0"
                className="form-control"
                onChange={(event) => setPropertyTax(event.target.value)}
                value={propertyTax}
                placeholder="Enter the property tax rate"
                aria-label="Enter the property tax rate"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="maintenanceCosts">Maintenance Costs($):</label>
              <input
                id="maintenanceCosts"
                type="number"
                min="0"
                className="form-control"
                onChange={(event) => setMaintenanceCosts(event.target.value)}
                value={maintenanceCosts}
                placeholder="Enter maintenance costs as a percentage of property price"
                aria-label="Enter maintenance costs as a percentage of property price"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="downPayment">Down Payment(%):</label>
              <input
                id="downPayment"
                type="number"
                min="0"
                className="form-control"
                onChange={(event) => setDownPayment(event.target.value)}
                value={downPayment}
                placeholder="Enter the percentage of down payment"
                aria-label="Enter the percentage of down payment"
                step="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mortgageRate">Mortgage Rate($):</label>
              <input
                id="mortgageRate"
                type="number"
                min="0"
                className="form-control"
                onChange={(event) => setMortgageRate(event.target.value)}
                value={mortgageRate}
                placeholder="Enter the mortgage rate"
                aria-label="Enter the mortgage rate"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="opportunityCostOfDownPayment">Opportunity Cost of Down Payment($):</label>
              <input
                id="opportunityCostOfDownPayment"
                type="number"
                min="0"
                className="form-control"
                onChange={(event) => setOpportunityCostOfDownPayment(event.target.value)}
                value={opportunityCostOfDownPayment}
                placeholder="Enter the opportunity cost of down payment"
                aria-label="Enter the opportunity cost of down payment"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="homePriceGrowth">Home Price Growth($):</label>
              <input
                id="homePriceGrowth"
                type="number"
                min="0"
                className="form-control"
                onChange={(event) => setHomePriceGrowth(event.target.value)}
                value={homePriceGrowth}
                placeholder="Enter the expected growth of home price"
                aria-label="Enter the expected growth of home price"
                step="0.1"
                required
              />
            </div>
          </div>
        </main>
      </div>
      <div className="result">
        {isRentSelected ? (
          <>
            <p>
              If you can purchase a similar property for less than{" "}
              <strong>
                ${calculateFairPrice(rent, propertyTax, maintenanceCosts, downPayment, mortgageRate, opportunityCostOfDownPayment, homePriceGrowth).toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </strong>
              , then owning is likely better.
            </p>
            <img src="/icons/buy-home.png" alt="Owning" />
          </>
        ) : (
          <>
            <p>
              If you can rent a similar property for less than{" "}
              <strong>
                ${calculateFairRent(price, propertyTax, maintenanceCosts, downPayment, mortgageRate, opportunityCostOfDownPayment, homePriceGrowth).toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </strong>{" "}
              per month, then renting is likely better.
            </p>
            <img src="/icons/rent.png" alt="Renting" />
          </>
        )}
      </div>
    </div>
    </div>
   

  );
};
export default Calculator;
