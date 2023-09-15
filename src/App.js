import axios from "axios";
import categories from "./components/categories";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("general");
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {

      const res = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&apikey=${process.env.REACT_APP_API_KEY}`);
      setNewsData(res.data.articles);
    

    } catch (err) {
      console.log(err);
      
      setError(err);
    }
    

  };

  useEffect(() => {
    fetchData();

  }, [category]);
  const handleNavClick = (cat)=> {
    setCategory(cat);
  }

  return (
    <>
      <div className="app_container">
      <p className="head_logo">ShortSamachar</p>
        <div className="navbar">
          
          {categories.map((cat, idx) => {
            return <div className="nav_item" key={idx} onClick={()=> handleNavClick(cat)} >{cat}</div>; 
          })}
        </div>
        <div className="news_container">
        {(error === null) && 
          <div className="banner">
          <h1>Latest <br /> Trending in</h1>
          <h2 style={{color:"lightgreen"}}>{category}</h2>
          </div>
        }

          {(error !== null) && <div className="error">
            <h1> error occurred </h1>
            <p style={{fontSize:"1rem", color:"lightgreen"}}>The API failed to fetch the data <br /> Check console for details of the error 
            <br /> possible reasons : <br />  api request limit is exceeded <br /> api error in the code</p>
            </div>}
          {newsData.slice(0,(newsData.length > 10) ? newsData.length%3:7).map((news, idx)=> {
            return (
              <div className="news_card" key={idx}>
                <h2>{news.title}</h2>
                <img src={news.image} alt="" />
                <p key={idx}>published on : {news.publishedAt.slice(0,10)}</p>
                <p className="description">{(news.description.length > 200) ? news.description.slice(0,200): news.description}</p>
                <button><a target="_blank" href={news.url}>Read More</a></button>
              </div>
            )
          })}
        </div>

        <div className="footer"> 
          <div>Short Samachar - A Short News Provider Website</div>
          <div>Made by: Sunny Kumar with ❤️ and " APIs "</div>
        </div>
      </div>
    </>
  );
}

export default App;
