import React, { useEffect,useState,useDispatch,useSelector } from 'react'
import { NavLink } from 'react-router-dom';
import { API_KEY } from './api/apikey';
import axios from './api/axios';
import { fetchGames } from '../features/gameSlice';


const AllProducts = () => {
    const [games, setGames] = useState([]);

    const gamesURL = `games`;

    // const dispatch=useDispatch();
    // const games=useSelector(state=>state.games.games);
    // useEffect(()=>{
    //     dispatch(fetchGames());
       
        
    // },[]);
   

    // useEffect(()=>{
    //     const fetchAsyncGames = ('games/fetch', async(page = 1) => {
    //         const { data } = await axios.get(`${gamesURL}?${API_KEY}&page=${page}`);
    //         setGames(data);
    //         // return data;
    //     });
    useEffect(() => {
        const fetchGames = async (page = 1) => {
            try {
                const { data } = await axios.get(`${gamesURL}?${API_KEY}&page=${page}`);
                setGames(data.results); // Assuming 'results' is the array of games in the response
                console.log(data.results);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        
        fetchGames(); // Call the fetchGames function
    }, []);


    // },[])
    const cardItem = (item) => {
        const randomPrice = (Math.random() * (100 - 10) + 10).toFixed(2);

        return (
            <div className="card my-5 py-4" key={item.id} style={{width: "18rem",  backgroundColor: "#333", color: "#fff" }}>
                <img src={item.background_image} className="card-img-top" alt={item.title}/>
                    <div className="card-body text-center">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="lead">{randomPrice} Tokens</p>
                        <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary">Buy Now</NavLink>
                    </div>
            </div>
                );
    }

    

                return (
                <div>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1 style={{ color:'white'}}>Products</h1>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-around">
                            {games.map(cardItem)}
                        </div>
                    </div>
                </div>
                )
}

export default AllProducts;
