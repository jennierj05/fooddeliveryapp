import React, { useState } from 'react'
import '../styles/mainarea.css'
import Header from './Header'
import doreamon from '../assests/doreamon2.jpeg'
import pizzaSilce from '../assests/pizzaSilce.png'
import Product from './products/Product'
import { useSelector } from 'react-redux'
const MainArea = () => {
    const user = useSelector(state=>state.user)
    const [category,setCategory]=useState('pizza')
    
    return (
        <div className='mainarea'>
            <Header/>
            <div className="banner">
                <div className="img">
                    <img src={doreamon} alt="" />
                </div>
                <div className="text">
                <h2>Hello Grab The Offer {user?.user?.name}</h2>
                <p>Buy one Get one free  <span>Yummy Pizza</span>  on the way to your door</p>
                <button>Order Now!</button>
               
                
                
                </div>
               
            </div>

         {/* category area */}
         <div className='category-area'>
             <h3>Menu</h3>
            <div className="category">
              <div className={`cat-icon ${category==='pizza'&&'active'} `} onClick={()=>setCategory('pizza')}>
                  <div className="img">

                  <img src={pizzaSilce} alt="pizza" />
                  </div>
                  <div className="text">
                   Pizzas
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Burger'&&'active'} `} onClick={()=>setCategory('Burger')}>
                  <div className="img">

                  <img src="https://cdn-icons-png.flaticon.com/128/878/878052.png" alt="pizza" />
                  </div>
                  <div className="text">
                   Burgers
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Sandwich'&&'active'} `} onClick={()=>setCategory('Sandwich')}>
                  <div className="img">

                  <img src="https://cdn-icons-png.flaticon.com/128/6518/6518098.png" alt="pizza" />
                  </div>
                  <div className="text">
                  Sandwich
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Smoothy'&&'active'} `} onClick={()=>setCategory('Smoothy')}>
                  <div className="img">

                  <img src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/2x/external-ice-cream-carnival-vitaliy-gorbachev-flat-vitaly-gorbachev.png" alt="pizza" />
                  </div>
                  <div className="text">
                   Smoothy
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Snaks'&&'active'} `} onClick={()=>setCategory('Snaks')}>
                  <div className="img">

                  <img src="https://img.icons8.com/color/2x/popcorn.png" alt="pizza" />
                  </div>
                  <div className="text">
                   Snaks
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Drink'&&'active'} `} onClick={()=>setCategory('Drink')}>
                  <div className="img">

                  <img src="https://img.icons8.com/external-itim2101-flat-itim2101/2x/external-drinking-cafe-itim2101-flat-itim2101.png" alt="pizza" />
                  </div>
                  <div className="text">
                   Drinks
                  </div>
                  
              </div>
            </div>
            <div className="all-list">
             <Product category={category}/>
            </div>
         </div>
         

        </div>
    )
}

export default MainArea
