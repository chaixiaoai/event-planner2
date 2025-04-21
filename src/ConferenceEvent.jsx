import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import QuantityControls from "./QuantityControls";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
const ConferenceEvent = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const venueItems = useSelector((state) => state.venue);
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowDetails(!showDetails);
    };

    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index));
    };
    
    const handleRemoveFromCart = (index) => {
        dispatch(decrementQuantity(index));
    };

    const handleIncrementAvQuantity = (index) => {
    };

    const handleDecrementAvQuantity = (index) => {
    };

    const handleMealSelection = (index) => {
       
    };

    const getItemsFromTotalCost = () => {
        const items = [];
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {

    };
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
          venueItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        }
        return totalCost;
      };
    const venueTotalCost = calculateTotalCost("venue");

    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
          if (showDetails) { // Check if showDetails is false
            setShowDetails(!showDetails); // Toggle showDetails to true only if it's currently false
          }
        }
      }

    return (
        <>
            <Navbar 
                navigateToProducts = {() => navigateToProducts}
                setShowDetails = {setShowDetails}
                showDetails = {showDetails}
            />
            <div className="main_container">
                {showDetails ? (
                    <div className="total_amount_detail">
                        <TotalCost 
                            totalCosts={venueTotalCost} 
                            handleClick={handleToggleItems} 
                            ItemsDisplay={() => <ItemsDisplay items={items} />} 
                        />
                    </div> ) : (
                    <div className="items-information">
                        <div id="venue" className="venue_container container_main">
                            <div className="text">
                                <h1>Venue Room Selection</h1>
                            </div>
                            <div className="venue_selection">
                            {venueItems.map((item, index) => (
                                <div className="venue_main" key={index}>
                                    <div className="img">
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <div className="text">{item.name}</div>
                                    <div>${item.cost}</div>
                                    <QuantityControls 
                                        quantity = {venueItems[index].quantity}
                                        onAdd  = {() => handleAddToCart(index)}
                                        onRemove = {() => handleRemoveFromCart(index)}
                                        isAddDisabled = {venueItems[index].quantity >= venueItems[index].maxQuantity}
                                        isRemoveDisabled = {venueItems[index].quantity ===0}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
                    </div>

                    {/*Necessary Add-ons*/}
                    <div id="addons" className="venue_container container_main">
                        <div className="text">
                            <h1> Add-ons Selection</h1>
                        </div>
                        <div className="addons_selection">

                        </div>
                        <div className="total_cost">Total Cost:</div>

                    </div>

                    {/* Meal Section */}

                    <div id="meals" className="venue_container container_main">

                        <div className="text">

                            <h1>Meals Selection</h1>
                        </div>

                        <div className="input-container venue_selection">

                        </div>
                        <div className="meal_selection">

                        </div>
                        <div className="total_cost">Total Cost: </div>


                    </div>
                </div>
                    ) 
                }




            </div>
        </>

    );
};

export default ConferenceEvent;
