import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import './Input.css';

const coinsList = [
    'Bitcoin',
    'Ethereum',
    'Tether',
    'BNB',
    'XRP',
    'USDC',
    'Solana',
    'Cardano',
    'Dogecoin',
    'Polygon',
    'Polkadot',
    'Litecoin',
    'Shiba Inu',
    'TRON',
    'Avalanche',
    'Dai',
    'Chainlink',
    'Uniswap',
    'Bitcoin Cash',
    'Stellar',
    'Monero',
    'Cosmos',
    'Ethereum Classic',
    'Filecoin',
    'Hedera',
    'Cronos',
    'Algorand',
    'VeChain',
    'ApeCoin',
    'Internet Computer',
    'EOS',
    'The Sandbox',
    'Decentraland',
    'Tezos',
    'Theta Network',
    'Axie Infinity',
    'NEO',
    'Aave',
    'Maker',
    'Flow',
    'IOTA',
    'Zcash',
    'Quant',
    'eCash',
    'Kusama',
    'Dash',
    'Nexo',
    'Waves',
    'THORChain',
    'Fantom',
    'Chiliz',
    'Basic Attention Token',
    'Zilliqa',
    'Loopring',
    'Curve DAO Token',
    'Enjin Coin',
    'Gala',
    'Harmony',
    'ICON',
    'Ontology',
    'Arweave',
    'Compound',
    'Siacoin',
    'Storj',
    'Nano',
    'Ankr',
    'Ravencoin',
    'NEM',
    'Amp',
    'Qtum',
    'Holo',
    'IOST',
    'OMG Network',
    'Audius',
    'Stacks',
    'Horizen',
    'Nervos Network',
    'Decred',
    'Golem',
    'Status',
    'Civic',
    'Augur',
    'Numeraire',
    'district0x',
    'Metal',
    'Fetch.ai',
    'Ocean Protocol',
    'Band Protocol',
    'Origin Protocol',
    'Orchid',
    'Reserve Rights',
    'Cartesi',
    'Injective',
    'Reef',
    'API3',
    'Alpha Finance Lab',
    'BarnBridge',
    'Perpetual Protocol',
    'Radicle',
    'Mirror Protocol',
    'Keep Network',
    'NuCypher',
    'Akash Network'
] as const;

interface InputProps {
    onSelect?: (coin: string) => void;
}

export default function Input({ onSelect }: InputProps) {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredCoins, setFilteredCoins] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.trim() === '') {
            setFilteredCoins([]);
            setShowDropdown(false);
            return;
        }

        const filtered = coinsList.filter(coin =>
            coin.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredCoins(filtered);
        setShowDropdown(true);
    };

    const handleCoinSelect = (coin: string) => {
        setInputValue(coin);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(coin);
        }
    };

    return (
        <div className="inputMain" ref={dropdownRef}>
            <TextField
                id="outlined-basic"
                label="Coin name"
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                fullWidth
                autoComplete="off"
            />

            {showDropdown && filteredCoins.length > 0 && (
                <div className="dropdown-list">
                    {filteredCoins.map((coin, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleCoinSelect(coin)}
                        >
                            {coin}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}