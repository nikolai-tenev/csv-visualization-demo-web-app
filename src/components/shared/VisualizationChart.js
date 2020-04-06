import React, {Component} from 'react';
import {observer} from "mobx-react";
import {applicationContext} from "../../services/ApplicationContext";
import {Bar, BarChart, Brush, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const service = applicationContext.visualizationsService;

@observer
class VisualizationChart extends Component {
    componentDidMount() {
        service.loadVisualizationChartData(this.props.id);
    }

    render() {
        const id = this.props.id;
        return <ResponsiveContainer id="chart">
            <BarChart data={service.chartData[id]}>
                <CartesianGrid strokeDasharray="4 4"/>
                <YAxis
                    dataKey="y"
                    textAnchor="end"
                    width={70}
                />
                <XAxis
                    dataKey="x"
                    height={70}
                />
                <Tooltip
                    cursor={{
                        fill: "#00000030"
                    }}
                    contentStyle={{
                        backgroundColor: "#444",
                        color: "#fff",
                        border: "none"
                    }}
                    itemStyle={{
                        color: "#fff",
                    }}/>
                <Bar dataKey="y" name={service.single.yAxis} fill="#3f51b5"/>
                <ReferenceLine y={0} stroke="#000"/>
                <Brush dataKey="x" height={30} stroke="#3f51b5"/>
                <Legend verticalAlign="top"/>
            </BarChart>
        </ResponsiveContainer>;
    }
}

export default VisualizationChart;
