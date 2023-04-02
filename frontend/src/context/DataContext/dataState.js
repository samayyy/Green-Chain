import { useEffect, useState } from "react";
import DataContext from "./dataContext";

import { contractAddresses, abi } from "../../constants";

import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";

function DataState({ children }) {
  const addresses = contractAddresses;
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex).toString();
  //Case
  const contract1Address = chainId in addresses ? addresses[chainId][0] : null;
  //Authority
  const contract2Address = chainId in addresses ? addresses[chainId][0] : null;
  console.log("contract2Address: ", contract2Address);
  const dispatch = useNotification();

  const { runContractFunction: createCampaign } = useWeb3Contract();
  const createNewCampaign = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract1Address,
        functionName: "createCampaign",
        params: _params,
      };
      await createCampaign({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      //   updateUI();
    }
  };

  const { runContractFunction: verifyCampaign } = useWeb3Contract();
  const verifyCampaignHelper = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract1Address,
        functionName: "verifyCampaign",
        params: _params,
      };
      await verifyCampaign({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      //   updateUI();
    }
  };

  const { runContractFunction: resolveCampaign } = useWeb3Contract();
  const resolveCampaignHelper = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract1Address,
        functionName: "resolveCampaign",
        params: _params,
      };
      await resolveCampaign({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      //   updateUI();
    }
  };

  const { runContractFunction: completeCampaign } = useWeb3Contract();
  const completeCampaignHelper = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract1Address,
        functionName: "completeCampaign",
        params: _params,
      };
      await completeCampaign({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      //   updateUI();
    }
  };

  const {
    runContractFunction: getPendingCampaignsByUser, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getPendingCampaignsByUser", // todo
    params: {},
  });

  const {
    runContractFunction: getVerifiedCampaignsByUser, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getVerifiedCampaignsByUser", // todo
    params: {},
  });

  const {
    runContractFunction: getResolvedCampaignsByUser, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getResolvedCampaignsByUser", // todo
    params: {},
  });

  const {
    runContractFunction: getCompletedCampaignsByUser, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getCompletedCampaignsByUser", // todo
    params: {},
  });

  const {
    runContractFunction: getNotCompletedCampaignsByUser, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getNotCompletedCampaignsByUser", // todo
    params: {},
  });

  const {
    runContractFunction: getRejectedCampaignsByUser, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getRejectedCampaignsByUser", // todo
    params: {},
  });

  const {
    runContractFunction: getPendingCampaignsByAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getPendingCampaignsByAuthority", // todo
    params: {},
  });

  const {
    runContractFunction: getVerifiedCampaignsByAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getVerifiedCampaignsByAuthority", // todo
    params: {},
  });

  const {
    runContractFunction: getResolvedCampaignsByAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getCompletedCampaignsByUser", // todo
    params: {},
  });

  const {
    runContractFunction: getCompletedCampaignsByAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getCompletedCampaignsByAuthority", // todo
    params: {},
  });

  const {
    runContractFunction: getNotCompletedCampaignsByAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getNotCompletedCampaignsByAuthority", // todo
    params: {},
  });

  const {
    runContractFunction: getRejectedCampaignsByAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getRejectedCampaignsByAuthority", // todo
    params: {},
  });

  const {
    runContractFunction: claimNftByUserOnCampaignVerification, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "claimNftByUserOnCampaignVerification", // todo
    params: {},
  });

  const { runContractFunction: claimNftByAuthorityOnCampaignCompletion } =
    useWeb3Contract();
  const claimNftByAuthorityOnCampaignCompletionHelper = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract1Address,
        functionName: "claimNftByAuthorityOnCampaignCompletion",
        params: _params,
      };
      await claimNftByAuthorityOnCampaignCompletion({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      //   updateUI();
    }
  };

  const {
    runContractFunction: getAllNftTokenIdOfUserOrAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract1Address,
    functionName: "getAllNftTokenIdOfUserOrAuthority", // todo
    params: {},
  });

  /* Authority */
  const { runContractFunction: addAuthority } = useWeb3Contract();
  const addAuthorityHelper = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract2Address,
        functionName: "addAuthority",
        params: _params,
      };
      await addAuthority({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      //   updateUI();
    }
  };

  const { runContractFunction: assignCampaignToAuthority } = useWeb3Contract();
  const assignCampaignToAuthorityHelper = async (_params) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: contract2Address,
        functionName: "assignCampaignToAuthority",
        params: _params,
      };
      await assignCampaignToAuthority({
        params: options,
        onSuccess: (tx) => handleSuccess(tx),
        onError: (error) => handleError(error),
      });
      //   updateUI();
    }
  };

  const {
    runContractFunction: isAuthority, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract2Address,
    functionName: "isAuthority", // todo
    params: {},
  });

  const {
    runContractFunction: getAuthorityDetails, // todo
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contract2Address,
    functionName: "getAuthorityDetails", // todo
    params: {},
  });

  // -- functions end
  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification({
      _type: "info",
      _message: "Transaction Complete!",
    });
    // updateUI();
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
    <DataContext.Provider
      value={{
        createNewCampaign,
        verifyCampaignHelper,
        resolveCampaignHelper,
        completeCampaignHelper,
        getPendingCampaignsByUser,
        getVerifiedCampaignsByUser,
        getResolvedCampaignsByUser,
        getCompletedCampaignsByUser,
        getNotCompletedCampaignsByUser,
        getRejectedCampaignsByUser,
        getPendingCampaignsByAuthority,
        getVerifiedCampaignsByAuthority,
        getResolvedCampaignsByAuthority,
        getCompletedCampaignsByAuthority,
        getNotCompletedCampaignsByAuthority,
        getRejectedCampaignsByAuthority,
        claimNftByUserOnCampaignVerification,
        claimNftByAuthorityOnCampaignCompletionHelper,
        getAllNftTokenIdOfUserOrAuthority,
        // -- Authority
        addAuthorityHelper,
        assignCampaignToAuthorityHelper,
        isAuthority,
        getAuthorityDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
