import { forwardRef, useContext, useRef, useLayoutEffect, useImperativeHandle } from "react";
import { Context } from "../cointainer/ChartCointainer";

export const SeriesWater = forwardRef((props, ref) => {

    const parent = useContext(Context)

    const context = useRef({
        api() {
			if (!this._api) {
				const { children, data, type, ...rest } = props;
				console.log(data);
				this._api = type === 'line'
					? parent.api().addLineSeries(rest)
					: parent.api().addAreaSeries(rest);
				this._api.setData(data);
			}
			return this._api;
		},
		free() {
			if (this._api) {
				parent.free();
			}
		},
    })

    useLayoutEffect(() => {
		const currentRef = context.current;
		currentRef.api();

		return () => currentRef.free();
	}, []);

	useLayoutEffect(() => {
		const currentRef = context.current;
		const { children, data, ...rest } = props;
		currentRef.api().applyOptions(rest);
	});

	useImperativeHandle(ref, () => context.current.api(), []);

    return (
        <>
            <Context.Provider value={context.current}>
                {props.children}
            </Context.Provider>
        </>
    )
})

SeriesWater.displayName = "SeriesWater";