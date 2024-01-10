import { createContext, useState } from "react";

export const PriceContext = createContext({});

export function PriceContextProvider({ children }) {
  const [stockPrice, setStockPrice] = useState([]);
  
  return (
    <PriceContext.Provider value={{ stockPrice,setStockPrice }}>
      {children}
    </PriceContext.Provider>
  );
}
