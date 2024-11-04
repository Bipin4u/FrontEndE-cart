// HomeComponent.js
import LandingSection from './LandingSection';
import Category from './Category'
import Products from './Products';
import WhatWeDo from './WhatWeDo';

function HomeComponent() {
  return (
    <div>
      <LandingSection/>      
      <Category/>
      <WhatWeDo />
      <Products/>   
    </div>
  );
}

export default HomeComponent;
