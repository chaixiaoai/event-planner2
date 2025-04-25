const CostDisplay = ({ items }) => {
    console.log(items);
    return (
    <>
        <div className="display_box1">
            {items.length === 0 && <p>No items selected</p>}
            <table className="table_item_data">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit Cost</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>${item.cost}</td>
                            <td>
                                {item.type === "meal"
                                ? ` For ${item.numberOfPeople} people`
                                : item.quantity}
                            </td>
                            <td>{item.type === "meal"
                                ? `${item.cost * item.numberOfPeople}`
                                : `${item.cost * item.quantity}`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    );
};

export default CostDisplay;