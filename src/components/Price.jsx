import React from 'react'

const Price = ({stockPrice}) => {
     function PriceCard({ heading, price, imageUrl, volume }) {
       return (
         <div className="border hover:scale-110 transition duration-200 ease-in-out  px-10 py-6 gap-5 flex item-center justify-between rounded-2xl bg-gray-200">
           <div>
             <div className="w-16 h-16 ">
               <img src={imageUrl} alt="open" />
             </div>
             <h3 className="text-xl font-bold">{heading}</h3>
           </div>
           <div className="items-center text-green-700  item-center flex justify-center">
             <p className="text-3xl">
               {volume ? "" : "$"}{price}
             </p>
           </div>
         </div>
       );
     }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10 px-8">
      <h3 className="text-3xl font-bold border rounded-full px-5 bg-black shadow-lg mb-2 hover:scale-105 ease-in-out transition duration-200 text-red-500">IBM</h3>
      <div className="grid 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2  gap-8 p-2 items-center justify-center w-full text-black">
        <PriceCard
          heading="Open"
          price={stockPrice.open}
          volume={false}
          imageUrl="https://cdn.iconscout.com/icon/premium/png-256-thumb/stock-market-graph-2031551-1715930.png"
        />
        {/* {console.log(stockPrice,"huehuehue")} */}
        <PriceCard
          heading="Close"
          price={stockPrice.close}
          volume={false}
          imageUrl="https://cdn-icons-png.flaticon.com/128/3490/3490239.png"
        />
        <PriceCard
          heading="High"
          price={stockPrice.high}
          volume={false}
          imageUrl="https://cdn-icons-png.flaticon.com/512/3501/3501896.png"
        />
        <PriceCard
          heading="Low"
          price={stockPrice.low}
          volume={false}
          imageUrl="https://cdn-icons-png.flaticon.com/512/3759/3759737.png"
        />
        <PriceCard
          heading="Volume"
          price={stockPrice.volume}
          volume={true}
          imageUrl="https://cdn.iconscout.com/icon/premium/png-256-thumb/trading-volume-4351329-3609302.png"
        />
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Price
