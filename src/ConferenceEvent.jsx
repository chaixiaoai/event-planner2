import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import QuantityControls from "./QuantityControls";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { decrementAvQuantity, incrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";
const ConferenceEvent = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealItems = useSelector((state) => state.meal);
    const dispatch = useDispatch();
    
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
        dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index));
    };

    const handleMealSelection = (index) => {
        dispatch(toggleMealSelection(index));
    };

    const getItemsFromTotalCost = () => {
        const items = [];
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {

    };
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        let items = null;
        if (section === "venue") {
            items = venueItems;
        } else if( section === "av") {
            items = avItems;
        } else if (section === "meal") {
            items = mealItems;
        }
        items.forEach((item) => {
            if(section !== "meal") {
                totalCost += item.cost * item.quantity;
            } else if (section === "meal" && item.selected){
                totalCost += item.cost * numberOfPeople;
            }
        });
        return totalCost;
      };
    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealTotalCost = calculateTotalCost("meal");

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
                            {avItems.map((item, index) => (
                                <div className="av_data venue_main" key={index}>
                                    <div className="img">
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <div className="text">{item.name}</div>
                                    <div>${item.cost}</div>
                                    <QuantityControls 
                                        quantity = {avItems[index].quantity}
                                        onAdd  = {() => handleIncrementAvQuantity(index)}
                                        onRemove = {() => handleDecrementAvQuantity(index)}
                                        isAddDisabled = {false}
                                        isRemoveDisabled = {avItems[index].quantity === 0}
                                    />
                                </div>
                            ))}

                        </div>
                        <div className="total_cost">Total Cost: ${avTotalCost}</div>

                    </div>

                    {/* Meal Section */}
                    <div id="meals" className="venue_container container_main">
                        <div className="text">
                            <h1>Meals Selection</h1>
                        </div>

                        <div className="input-container venue_selection">
                            <label htmlFor="numberOfPeople"><h3>Number of people: </h3></label>
                            <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                min="1"
                            />
                        </div>
                        <div className="meal_selection">
                            {mealItems.map((item, index) => (
                                <div className="meal_item" key={index}>
                                    <input type="checkbox" id={index} checked={item.selected}
                                        onChange={() => handleMealSelection(index)}
                                    />
                                    <div className="text">{item.name}</div>
                                    <div>${item.cost}</div>
                                </div>
                            ))}
                        </div>
                        <div className="total_cost">Total Cost: ${mealTotalCost} </div>
                    </div>
                </div>
                    ) 
                }




            </div>
        </>

    );
};

export default ConferenceEvent;
