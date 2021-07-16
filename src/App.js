import React from 'react'

import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner'
import Nav from './Nav'


function App() {
  return (
    <div className="App">
      {/* navbar */}
      <Nav />
       {/* banner */}
<Banner />
<Row title="ORIGINALES NETFLIX" fetchUrl={requests.fetchNetFlixOriginals} isLargeRow={true} />  
  
<Row title="Trending now" fetchUrl={requests.fetchTrending} />       
<Row title="Top Rated" fetchUrl={requests.fetchTopRated} />       
<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />       
<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />    
<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />       
<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} /> 
<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />       




    </div>
  );
}

export default App;
