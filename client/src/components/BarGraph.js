import {
    Animation,
    ArgumentScale,
    EventTracker,
    Palette,
    Stack,
} from "@devexpress/dx-react-chart";
import {
    ArgumentAxis,
    BarSeries,
    Chart,
    Legend,
    Title,
    Tooltip,
    ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import Paper from "@mui/material/Paper";
import { scaleBand } from "@devexpress/dx-chart-core";
import { useState } from "react";

const colorScheme = [
    "#f6e58d",
    "#30336b",
    "#eb4d4b",
    "#22a6b3",
    "#f0932b",
    "#6ab04c",
    "#be2edd",
    "#1098ad",
];

const Root = (props) => (
    <Legend.Root
        {...props}
        sx={{ display: "flex", flexDirection: "row", m: "0 auto" }}
    />
);
const Label = (props) => (
    <Legend.Label {...props} sx={{ whiteSpace: "nowrap" }} />
);

const tooltipContentTitleStyle = {
    fontWeight: "bold",
    paddingBottom: 0,
};
const tooltipContentBodyStyle = {
    paddingTop: 0,
};

const BarGraph = ({ loading, data, seriesData, firstRender }) => {
    const [tooltipTarget, setTooltipTarget] = useState(null);

    const changeTooltip = (targetItem) => {
        setTooltipTarget(targetItem);
    };

    const TooltipContent = (props) => {
        const { targetItem } = props;

        return (
            <div>
                <div>
                    <Tooltip.Content
                        style={tooltipContentTitleStyle}
                        text={targetItem.series}
                    />
                </div>
                <div>
                    <Tooltip.Content
                        style={tooltipContentBodyStyle}
                        text={data[targetItem.point][targetItem.series]}
                    />
                </div>
            </div>
        );
    };
    return (
        <Paper
            elevation={15}
            sx={{ border: "1px solid #116530", p: 2, borderRadius: 4 }}
        >
            {!loading && (
                <Chart data={data}>
                    <ArgumentScale factory={scaleBand} />
                    <ArgumentAxis />
                    <ValueAxis position='left' />

                    <Palette scheme={colorScheme} />
                    {seriesData.map((value) => {
                        return (
                            <BarSeries
                                name={value}
                                valueField={value}
                                argumentField='week'
                                barWidth={0.6}
                                key={value}
                                maxBarWidth={1}
                            />
                        );
                    })}
                    {firstRender && <Animation />}
                    <Legend
                        position='bottom'
                        rootComponent={Root}
                        labelComponent={Label}
                    />
                    <EventTracker />
                    <Tooltip
                        targetItem={tooltipTarget}
                        onTargetItemChange={changeTooltip}
                        contentComponent={TooltipContent}
                    />
                    <Title text='Total Trees Planted vs Week Number' />
                    <Stack
                        stacks={[
                            {
                                series: seriesData,
                            },
                        ]}
                    />
                </Chart>
            )}
        </Paper>
    );
};

export default BarGraph;
