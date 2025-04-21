import React from "react";

const QuantityControls = ({
  quantity,
  onAdd,
  onRemove,
  isAddDisabled,
  isRemoveDisabled,
}) => {
  return (
    <div className="button_container">
      <button
        className={isRemoveDisabled ? "btn-warning btn-disabled" : "btn-warning btn-minus"}
        onClick={onRemove}
        disabled={isRemoveDisabled}
      >
        &#8211;
      </button>
      <span className="selected_count" style={{ display: "inline-block", verticalAlign: "middle" }}>
         {quantity}
      </span>
      <button
        className={isAddDisabled ? "btn-success btn-disabled" : "btn-success btn-plus"}
        onClick={onAdd}
        disabled={isAddDisabled}
      >
        &#43;
      </button>
    </div>
  );
};

export default QuantityControls;
