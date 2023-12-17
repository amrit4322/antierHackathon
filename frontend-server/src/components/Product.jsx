import React, { useEffect,useState,useDispatch,useSelector, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { API_KEY } from './api/apikey';
import axios from './api/axios';
import { Link } from 'react-router-dom';
import { fetchGames } from '../features/gameSlice';
import UserContext from './context/user/userContext';


const Product = () => {
    const context = useContext(UserContext);
    const [games, setGames] = useState([]);
  const {fetchDatafn} = context;
      const gamesURL = `games`;

  
    useEffect(() => {
        const fetchGames = async (page = 1) => {
            let data =await fetchDatafn();
            setGames(data);
            
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
                            {/* {games.map(cardItem)} */}
                            {games.slice(0, 6).map(cardItem)}
                        </div>
                        <div className="d-flex justify-content-end">
                           <Link to="/allProducts" className="btn btn-success">
                                    More...
                          </Link>
                        </div>
                       
                    </div>
                    {/* <Link to="/next-page">More...</Link> */}
                    
                </div>

                )
}

export default Product
