import { forwardRef, useLayoutEffect, useRef, createContext, useEffect, useImperativeHandle } from "react";
import { createChart } from "lightweight-charts";

export const Context = createContext();

export const ChartCointainers = forwardRef((props, ref)=> {
    const { children, container, layout, ...rest } = props;

	console.log(props.data);

    const chartApiRef = useRef({
		api() {
			if (!this._api) {
				this._api = createChart(container, {
					...rest,
					layout,
					width: container.clientWidth,
					height: 300,
				});
				this._api.timeScale().fitContent();
			}
			return this._api;
		},
		free() {
			if (this._api) {
				this._api.remove();
			}
		},
	});

    useLayoutEffect(() => {
        const currentRef = chartApiRef.current;
        const chart  = currentRef.api();
        
        const handleResize = () => {
            chart.applyOptions({
				...rest,
				width: container.clientWidth,
			});
        }

        window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			chartApiRef.current.free();
		};
    }, [])

    useLayoutEffect(() => {
		const currentRef = chartApiRef.current;
		currentRef.api();
	}, []);

	useLayoutEffect(() => {
		const currentRef = chartApiRef.current;
		currentRef.api().applyOptions(rest);
	}, []);

	useImperativeHandle(ref, () => chartApiRef.current.api(), []);

	useEffect(() => {
		const currentRef = chartApiRef.current;
		currentRef.api().applyOptions({ layout });
	}, [layout]);

	return (
		<Context.Provider value={ chartApiRef.current }>
			{props.children}
		</Context.Provider>
	);
})

ChartCointainers.displayName = "ChartCointainer";