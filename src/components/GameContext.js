
import React from 'react'
//import usePersistedState from '../hooks/use-persisted-state.hook';
import useInterval from '../hooks/use-interval.hook';


export const GameContext = React.createContext();

const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80 }
];

console.log("TESTINGTESTINGTESTING")

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = React.useState('numCookies', 1000);

  const [purchasedItems, setPurchasedItems] = React.useState(
    'purchasedItems',
    {
      cursor: 0,
      grandma: 0,
      farm: 0
    }
  );

  console.log("here", items[0].value)

  const calculateCookiesPerSecond = purchasedItems => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find(item => item.id === itemId);
      const value = itemId.value;

      return acc + value * numOwned;
    }, 0);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);


  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
      }}
    >
      {children}
    </GameContext.Provider>
  );
};