import {AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid} from "recharts";

export default function GraphOne({array}:{array:any}) {
    return (
        <>
            <AreaChart width={730} height={250} data={array}
                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="limegreen" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="limegreen" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="limegreen" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="limegreen" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="$" stroke="red" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </>
    )
}
