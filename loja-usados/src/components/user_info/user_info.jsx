import { useState, useEffect } from "react";
import "./index.css";

export function UserInfo({ user }) {
//   if (!user) {
//     return <p>Carregando...</p>;
//   }

  return (
    <div className="user-info">
      <div className="top-area">
          {/* <h1 className="user-name">{user.name}</h1> */}
          {/* <h2 className="user-email">{user.email}</h2> */}
      </div>
      <div className="bottom-area">
        <section>
            <div className='group'>
                {/* {loading ? (
                    <div className='empty-search'>
                        <h1>Carregando...</h1>
                    </div>
                ) : sellOffers.length > 0 ? (
                    sellOffers.map((sellOffer) => (
                        <SellCard key={sellOffer._id} offer={sellOffer} />
                    ))
                ) : (
                    <div className='empty-search'>
                        <h1>Não há ofertas de venda disponíveis.</h1>
                    </div>
                )} */}
            </div>
            <div className='group'>
                {/* {loading ? (
                    <div className='empty-search'>
                        <h1>Carregando...</h1>
                    </div>
                ) : buyOffers.length > 0 ? (
                    buyOffers.map((buyOffer) => (
                        <BuyCard key={buyOffer._id} offer={buyOffer} />
                    ))
                ) : (
                    <div className='empty-search'>
                        <h1>Não há ofertas de compra disponíveis.</h1>
                    </div>
                )} */}
            </div>
        </section>
      </div>
    </div>
  );
}
