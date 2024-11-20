// HomeComponent.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import LandingSection from './LandingSection';
import Category from './Category'
import Products from './Products';

function HomeComponent() {
  const [popularFilterText, setPopularFilterText] = useState("sofa");
  const [popular, setPopular] = useState<any>([]); 
  const [OffersfilterText, setOffersFilterText] = useState("sofa");
  const [offers, setOffers] = useState<any>([]);
  const [trendingfilterText, setTrendingFilterText] = useState("sofa");
  const [trending, setTrending] = useState<any>([]);


  useEffect(() => {    
    axios.get(`http://127.0.0.1:8000/api/popular/?type=${popularFilterText}`)
      .then(res => {
        setPopular(res.data);  
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, [popularFilterText]);

  useEffect(() => {    
    axios.get(`http://127.0.0.1:8000/api/discount/?type=${OffersfilterText}`)
      .then(res => {
        setOffers(res.data); 
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, [OffersfilterText]);

  useEffect(() => {    
    axios.get(`http://127.0.0.1:8000/api/trending/?type=${trendingfilterText}`)
      .then(res => {
        setTrending(res.data); 
        console.log(trending)
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, [trendingfilterText]);

  return (
    <div>
      <LandingSection/>      
      <Category/>
      {/* <WhatWeDo /> */}
      <Products title={'Popular Items'} items = {popular} filter={setPopularFilterText}/>  
      <Products title={'Best Offers'} items = {offers} filter={setOffersFilterText}/>  
      <Products title={'Trending'} items = {trending} filter={setTrendingFilterText}/>  

    </div>
  );
}

export default HomeComponent;
