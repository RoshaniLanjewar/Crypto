import axios from 'axios';
import Price from '../models/Price';

const symbols = ['bitcoin', 'ethereum', 'litecoin', 'ripple', 'cardano'];
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
//const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';
// 'https://api.coingecko.com/api/v3/coins/markets
const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        ids: symbols.join(','),
        vs_currencies: 'usd'
      }
    });
    
    const data = response.data;
    
    for (const symbol of symbols) {
      const price = new Price({
        symbol,
        price: data[symbol].usd,
      });
      await price.save();
    }
    
    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchData;
