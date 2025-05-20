import { useState, useEffect } from "react";
import GraphOne from "../../UI component/graphs/GraphOne/GraphOne.tsx";
import Loader from "../../UI component/Loader/Loader.tsx";
import Header from "../../UI component/header/Header.tsx";

interface PricePoint {
    $: number; // цена в долларах
}

type CoinPriceData = PricePoint[];

type MainArrayType = CoinPriceData[];

const coinsNameArray: string[] = [
    'bitcoin',
    'ethereum',
    'tether',
    'ripple',
    'dogecoin',
];

export default function CoinsListPage() {
    const [mainArray, setMainArray] = useState<MainArrayType>([]);

    const [coinsNames] = useState<string[]>(coinsNameArray);

    useEffect(() => {
        const getCoinsArray = async () => {
            const historyCoinsPriceArray: MainArrayType = [];

            for (let a = 0; a < coinsNames.length; a++) {
                const url = `https://api.coingecko.com/api/v3/coins/${coinsNames[a]}/market_chart?vs_currency=usd&days=360&interval=daily`;
                try {
                    const response = await fetch(url);
                    const data: { prices?: [number, number][] } = await response.json();

                    if (data && data.prices) {
                        const graphArray: CoinPriceData = data.prices.map((price) => ({
                            $: price[1],
                        }));
                        historyCoinsPriceArray.push(graphArray);
                    } else {
                        console.warn(`No prices data for ${coinsNames[a]}`);
                        historyCoinsPriceArray.push([]);
                    }
                } catch (error) {
                    console.error(`Ошибка при загрузке данных для ${coinsNames[a]}:`, error);
                    historyCoinsPriceArray.push([]);
                }
            }

            setMainArray(historyCoinsPriceArray);
            console.log('Обновленный массив данных:', historyCoinsPriceArray);
        };

        getCoinsArray();
    }, [coinsNames]);

    return (
        <div>
            <Header />
            <div
                style={{
                    display: "grid",
                    justifyContent: "center",
                    gridTemplateColumns: "repeat(2, 700px)",
                    textAlign: "center",
                }}
            >
                {mainArray.length > 0 ? (
                    mainArray.map((coinData, index) => (
                        <div key={index}>
                            <h1>{coinsNames[index]}</h1>
                            <GraphOne array={coinData} />
                        </div>
                    ))
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}