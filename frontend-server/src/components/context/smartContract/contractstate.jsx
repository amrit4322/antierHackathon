import { useState } from "react";
// import NoteContext from "./noteContext";
import { address, abi } from "../../constants/GamingPlaceAbi";
import ContractContext from "./contractContext";
import Web3 from "web3";

const ContractState = (props) => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userData, setUserData] = useState(null);

  const addUser = async (account) => {
    try {
      const response = await fetch("http://localhost:3002/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to specify JSON
        },
        body: JSON.stringify({ publicID: account }),
      });
      if (!response.ok) {
        console.log("Error file fetching");
      }

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3002/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to specify JSON
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Error file fetching");
      }

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const purchaseGames = async (id, data) => {
    try {
      const response = await fetch(
        `http://localhost:3002/users/${id}/purchase`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to specify JSON
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        console.log("Error file fetching");
      }

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const requestAccount = async () => {
    if (typeof window.ethereum != "undefined") {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881", // Mumbai testnet chain ID
              chainName: "Mumbai Testnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"], // Mumbai testnet RPC endpoint
              blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"], // Mumbai testnet block explorer
            },
          ],
        });

        let account = await window.ethereum.enable(); // Request account access
        setWeb3(web3Instance);
        addUser(account[0]);
        setAccount(account);

        console.log("Address", account);
        //conntecting contract
        const contractInstance = new web3Instance.eth.Contract(abi, address);
        setContract(contractInstance);
        return true;
      } catch (error) {
        console.log("Error connection...", error);
      }
    } else {
      console.log("MetaMask not detected");
    }
  };

  const buyTokenfn = async (quantity) => {
    if (web3 && contract) {
      try {
        // Convert quantity to a BigNumber or integer based on your contract
        console.log("Quantitiy ", quantity);
        const quantityValue = quantity / 100;

        // let transaction = await contract.methods.createGame(1,"Amrit",0,10).send({
        //   from:(await web3.eth.getAccounts())[0]
        // });
        let transaction = await contract.methods.buyToken(quantity).send({
          from: address[0],
          value: quantityValue,
        });

        console.log("Wait for transaction to be mined");

        // Handle success or update UI accordingly
        console.log("Transaction successful!", transaction);
        return true;
      } catch (error) {
        // Handle error or update UI accordingly
        console.error("Error buying:", error);
      }
    } else {
      console.error("Web3 or contract not initialized.");
    }
  };
  const creatFn = async (id, name, cat, costprice) => {
    if (web3 && contract) {
      try {
        // Convert quantity to a BigNumber or integer based on your contract
        console.log("Creatfn", id, name, cat, costprice);

        let transaction = await contract.methods
          .creatGame(id, name, cat, costprice)
          .send({
            from: address[0],
          });

        console.log("Wait for transaction to be mined");

        // Handle success or update UI accordingly
        console.log("Transaction successful!", transaction);
        return true;
      } catch (error) {
        // Handle error or update UI accordingly
        console.error("Error buying:", error);
      }
    } else {
      console.error("Web3 or contract not initialized.");
    }
  };

  const deleteFn = async (id) => {
    if (web3 && contract) {
      try {
        // Convert quantity to a BigNumber or integer based on your contract
        console.log("Delete Game fn", id);

        let transaction = await contract.methods.deleteGame(id).send({
          from: address[0],
        });

        console.log("Wait for transaction to be mined");

        // Handle success or update UI accordingly
        console.log("Transaction successful!", transaction);
        return true;
      } catch (error) {
        // Handle error or update UI accordingly
        console.error("Error deleting:", error);
      }
    } else {
      console.error("Web3 or contract not initialized.");
    }
  };
  const tokenBalancefn = async () => {
    if (web3 && contract) {
      try {
        // Convert quantity to a BigNumber or integer based on your contract

        let transaction = await contract.methods
          .tokenBalance(address[0])
          .call();
        console.log("Wait for transaction to be mined");

        // Handle success or update UI accordingly
        console.log("Transaction successful!", transaction);
        return true;
      } catch (error) {
        // Handle error or update UI accordingly
        console.error("Error finding token:", error);
      }
    } else {
      console.error("Web3 or contract not initialized.");
    }
  };
  const findGame = async (id) => {
    if (web3 && contract) {
      try {
        // Convert quantity to a BigNumber or integer based on your contract
        console.log("find Game fn", id);

        let transaction = await contract.methods.Game(id).call();
        console.log("Wait for transaction to be mined");

        // Handle success or update UI accordingly
        console.log("Transaction successful!", transaction);
        return true;
      } catch (error) {
        // Handle error or update UI accordingly
        console.error("Error finding:", error);
      }
    } else {
      console.error("Web3 or contract not initialized.");
    }
  };
  return (
    <ContractContext.Provider
      value={{
        userData,
        account,
        web3,
        contract,
        requestAccount,
        buyTokenfn,
        creatFn,
        deleteFn,
        tokenBalancefn,
        findGame,
        purchaseGames,
        updateUser,
      }}
    >
      {props.children}
    </ContractContext.Provider>
  );
};

export default ContractState;
