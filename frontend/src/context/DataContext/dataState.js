import { useEffect, useState } from "react";
import DataContext from "./dataContext";

import { contractAddresses, abi } from "../../constants";

import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";

function DataState({ children }) {
  const addresses = contractAddresses;
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex).toString();
  const contract1Address = chainId in addresses ? addresses[chainId][0] : null;

  const dispatch = useNotification();

  const {
    runContractFunction: here_code_function1, // todo
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "contract_function_name", // todo
    params: {},
  });

  const { runContractFunction: here_code_function2 } = useWeb3Contract();
  const function_to_call = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract1Address,
        functionName: "contract_function_name",
        params: _params,
      };
      await here_code_function2({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      updateUI();
    }
  };

  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification({
      _type: "info",
      _message: "Transaction Complete!",
    });
    updateUI();
  };

  const handleError = function (error) {
    console.log(error);
    handleNewNotification({ _type: "error", _message: "Transaction Failed!" });
  };

  const handleNewNotification = function ({ _type, _message }) {
    dispatch({
      type: _type,
      message: _message,
      title: "Transaction Notification",
      position: "bottomR",
    });
  };
  return (
    <DataContext.Provider value={{ here_code_function1, function_to_call }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
