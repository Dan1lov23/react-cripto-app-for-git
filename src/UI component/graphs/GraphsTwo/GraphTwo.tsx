import {BarChart, Bar, Legend, Tooltip, YAxis, XAxis, CartesianGrid} from "recharts";

export default function GraphTwo({array}:{array: any}) {
    return (
        <>
            <BarChart width={730} height={250} data={array}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="$" fill="limegreen" />
            </BarChart>
        </>
    )
}