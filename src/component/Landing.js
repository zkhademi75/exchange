import React , {useEffect , useState} from 'react';

//api
import { getCoin } from '../services/api';

//component
import Loader from './Loader';
import Coin from './Coin';

//style
import styles from "./Landing.module.css"

const Landing = () => {

const [coins , setCoins] = useState([])
const [search , setSearch] = useState("")

useEffect(() => {
    const fetchApi = async () => {
        const data = await getCoin();
        console.log(data)
        setCoins(data)
    }

    fetchApi();
} , []);

const searchHandler = (event) => {
    setSearch(event.target.value)
}

const searchedCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
       <>
        <input className={styles.input} type="text" placeholder="Search" value={search} onChange={searchHandler}/>
        {
            coins.length ? 
        <div className={styles.container}>
            {
                searchedCoin.map(coin => <Coin
                        key={coin.id}
                        name={coin.name}
                        symbol={coin.symbol}
                        image={coin.image}
                        price={coin.current_price}
                        marketCap={coin.market_cap}
                        changePrice={coin.price_change_percentage_24h}
                    />
                    )
            }
        </div> :
        <Loader/>
        }
       </>
    );
};

export default Landing;