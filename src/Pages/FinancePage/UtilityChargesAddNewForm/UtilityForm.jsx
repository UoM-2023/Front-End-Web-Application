import React, { useState } from "react";
import SelectField from "../../../Component/SelectField/SelectField";

function UtilityForm() {
    const [selectedBuilding, setSelectedBuilding] = useState("");

  const handleBuildingChange = (value) => {
    setSelectedBuilding(value);
    // Any other logic you want to perform when the value changes
  };
  return (
    <div className='utilityFormContainer'>
        <SelectField
        label="Utility Type"
        options={[
          { value: "gas", label: "Gas" },
          { value: "water", label: "Water" },
          { value: "electricity", label: "Electricity" },
          { value: "other", label: "Other" },
        ]}
        initialValue={selectedBuilding}
        onChange={handleBuildingChange}
      />

    </div>
  );
}

export default UtilityForm;