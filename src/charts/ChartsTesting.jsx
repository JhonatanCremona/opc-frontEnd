import { createChart } from "lightweight-charts";}

const chartOptions = {
	layout: {
		textColor: 'black',
		background: { type: 'solid', color: 'white' },
	},
};
export const chart = createChart(document.getElementById('container'), chartOptions);

chart.applyOptions({
	leftPriceScale: {
		visible: true,
		borderVisible: false,
	},
	rightPriceScale: {
		visible: false,
	},
	timeScale: {
		borderVisible: false,
	},
	crosshair: {
		horzLine: {
			visible: false,
			labelVisible: false,
		},
		vertLine: {
			visible: true,
			style: 0,
			width: 2,
			color: 'rgba(32, 38, 46, 0.1)',
			labelVisible: false,
		},
	},
	// hide the grid lines
	grid: {
		vertLines: {
			visible: false,
		},
		horzLines: {
			visible: false,
		},
	},
});

const series = chart.addAreaSeries({
	topColor: 'rgba( 239, 83, 80, 0.05)',
	bottomColor: 'rgba( 239, 83, 80, 0.28)',
	lineColor: 'rgba( 239, 83, 80, 1)',
	lineWidth: 2,
	crossHairMarkerVisible: false,
	priceLineVisible: false,
	lastValueVisible: false,
});
series.priceScale().applyOptions({
	scaleMargins: {
		top: 0.3, // leave some space for the legend
		bottom: 0.25,
	},
});

series.setData([
	{ time: '2018-03-28', value: 154 },
]);

const container = document.getElementById('container');

const toolTipWidth = 96;

// Create and style the tooltip html element
const toolTip = document.createElement('div');
toolTip.style = `width: ${toolTipWidth}px; height: 300px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border-radius: 4px 4px 0px 0px; border-bottom: none; box-shadow: 0 2px 5px 0 rgba(117, 134, 150, 0.45);font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
toolTip.style.background = `rgba(${'255, 255, 255'}, 0.25)`;
toolTip.style.color = 'black';
toolTip.style.borderColor = 'rgba( 239, 83, 80, 1)';
container.appendChild(toolTip);

// update tooltip
chart.subscribeCrosshairMove(param => {
	if (
		param.point === undefined ||
		!param.time ||
		param.point.x < 0 ||
		param.point.x > container.clientWidth ||
		param.point.y < 0 ||
		param.point.y > container.clientHeight
	) {
		toolTip.style.display = 'none';
	} else {
		// time will be in the same format that we supplied to setData.
		// thus it will be YYYY-MM-DD
		const dateStr = param.time;
		toolTip.style.display = 'block';
		const data = param.seriesData.get(series);
		const price = data.value !== undefined ? data.value : data.close;
		toolTip.innerHTML = `<div style="color: ${'rgba( 239, 83, 80, 1)'}">⬤ ABC Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
			${Math.round(100 * price) / 100}
			</div><div style="color: ${'black'}">
			${dateStr}
			</div>`;

		let left = param.point.x; // relative to timeScale
		const timeScaleWidth = chart.timeScale().width();
		const priceScaleWidth = chart.priceScale('left').width();
		const halfTooltipWidth = toolTipWidth / 2;
		left += priceScaleWidth - halfTooltipWidth;
		left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
		left = Math.max(left, priceScaleWidth);

		toolTip.style.left = left + 'px';
		toolTip.style.top = 0 + 'px';
	}
});

chart.timeScale().fitContent();