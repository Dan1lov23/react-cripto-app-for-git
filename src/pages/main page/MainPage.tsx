import GetCoin from '../../components/getCoin/GetCoin.tsx';
import CoinInfo from '../../UI component/coin info/CoinInfo.tsx';
import GraphOne from "../../UI component/graphs/GraphOne/GraphOne.tsx";
import GraphTwo from "../../UI component/graphs/GraphsTwo/GraphTwo.tsx";
import Loading from "../../UI component/Loader/Loader.tsx";
import Header from "../../UI component/header/Header.tsx"

import { useState, useCallback} from 'react';

export default function MainPage() {
    const [coinData, setCoinData] = useState({
        name: '',
        image: '',
        rate: ''
    });

    const [arrayForGraph, setArrayForGraph] = useState([]);
    const [graphOne, setGraphOne] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const changeGraph = useCallback(() => {
        setGraphOne(prev => !prev);
    }, []);

    const getCoin = useCallback(async () => {
        try {
            setIsLoading(true);
            setError('');
            setArrayForGraph([]);

            const inputElement = document.getElementById('outlined-basic') as HTMLInputElement;
            if (!inputElement?.value) {
                setError('Введите название криптовалюты');
                return;
            }

            const coinId = inputElement.value.toLowerCase();

            const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Криптовалюта не найдена');
            }
            const data = await response.json();

            setCoinData({
                name: data.id,
                image: data.image.small,
                rate: data.market_data.current_price.usd
            });

            const historyRateUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=360&interval=daily`;
            const historyRateResponse = await fetch(historyRateUrl);
            if (!historyRateResponse.ok) {
                throw new Error('Не удалось загрузить исторические данные');
            }
            const historyRateData = await historyRateResponse.json();

            const graphArray = historyRateData.prices.map((price: [number, number], index: number) => ({
                name: index + 1,
                '$': price[1]
            }));

            setArrayForGraph(graphArray);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error instanceof Error ? error.message : 'Произошла ошибка');
            setCoinData({ name: '', image: '', rate: '' });
            setArrayForGraph([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const currentGraph = graphOne ? (
        <GraphOne array={arrayForGraph} key="graph-one" />
    ) : (
        <GraphTwo array={arrayForGraph} key="graph-two" />
    );

    return (
        <div className="main-page">
            <Header />
            <div className='getCoinMain' style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2.5%',
            }}>
                <GetCoin func={getCoin} changeGraph={changeGraph} />
            </div>
            <div style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2.5%',
            }}>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <h1 style={{ color: 'red' }}>{error}</h1>
                ) : arrayForGraph.length > 0 ? (
                    <div>
                        <div style={{
                            display: 'grid',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2.5%',
                            textAlign: 'center'
                        }}>
                            <CoinInfo
                                coinName={coinData.name}
                                coinImg={coinData.image}
                                coinPrice={coinData.rate}
                            />
                        </div>
                        <div style={{
                            display: 'grid',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '2.5%'
                        }}>
                            {currentGraph}
                        </div>
                    </div>
                ) : (
                    <div style={{textAlign: 'center'}}>
                        <h1>Введите название криптовалюты</h1>
                        <img src="../../../src/gir%20animation/852.gif" style={{ marginTop: '32.5%' }} />
                    </div>
                )}
            </div>
        </div>
    );
}
