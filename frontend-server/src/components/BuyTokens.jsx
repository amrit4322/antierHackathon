import React, { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import {address,abi} from './constants/GamingPlaceAbi';
import ContractContext from './context/smartContract/contractContext';


export default function BuyButton() {
  const [quantity, setQuantity] = useState('');
 
  const context = useContext(ContractContext);
  const {account,web3,contract} = context;
    

  const handleBuyNow = async () => {
    if (web3 && contract) {
      try {
          // Convert quantity to a BigNumber or integer based on your contract
          console.log("Quantitiy ", quantity);
        const quantityValue =1+quantity/100;
          console.log("balance ", await web3.eth.getBalance(account[0]));
          console.log("Methods", await contract.methods);
          // let transaction = await contract.methods.createGame(1,"Amrit",0,10).send({
          //   from:(await web3.eth.getAccounts())[0]
          // });
          let transaction = await contract.methods.createGame(1,"Amrit",0,10).send({
              from:(await web3.eth.getAccounts())[0]
            });
        // // Replace 'yourCoactFunction' with your actual smart contract function
        // let transaction = await contract.methods.buyToken(quantityValue).send({
        //     from: (await web3.eth.getAccounts())[0],
        //   value: quantityValue,
        // });
        console.log("Wait for transaction to be mined");
        
        // Handle success or update UI accordingly
        console.log('Transaction successful!',transaction);
        let transaction2 = await contract.methods.Games(1).call()
        console.log("Wait for transaction 2 to be mined");
        
        // Handle success or update UI accordingly
        console.log('Transaction 2 successful!',transaction2);
      } catch (error) {
        // Handle error or update UI accordingly
        console.error('Error buying:', error);
      }
    } else {
      console.error('Web3 or contract not initialized.');
    }
  };


  return (
    <div>
      {/* <button onClick={connectToWeb3}>Connect to web3</button> */}
      <h1>Buy Tokens</h1>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
       <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};
