export default function CoinInfo({coinName, coinImg, coinPrice}:{coinName:string, coinImg:string, coinPrice:string}) {
    return (
        <>
            <div className="coinInfoMain">
                <h1>{coinName}</h1>
                <h1>{coinPrice} $</h1>
                <img src={coinImg}/>
            </div>
        </>
    )
}