//Depending 
import { useState, useCallback } from "react";

//Component
import { ChartCointainers } from "./cointainer/ChartCointainer"

export const ChartWater = (props) => {
    const [container, setContainer] = useState(false)
    const handleRef = useCallback(ref => setContainer(ref), []);


    return (
        <div ref={handleRef}>
			{container && < ChartCointainers {...props} container={container} />}
		</div>
    )
}