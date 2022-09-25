/* Moralis init code */
const serverUrl = "https://aurycexwsj87.usemoralis.com:2053/server";
const appId = "aKDhJOS4vevpx2QCLziMRZJnRLz5ZPjMvmZLZ5gA";


Moralis.start({ serverUrl, appId });

const login = async () => {
  const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();
  if (!isMetaMaskInstalled) {
    alert("install metamask");
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      "_blank"
    );
    return false;
  }

  await Moralis.enableWeb3();

  let user = Moralis.User.current();
  const chainIds = await Moralis.getChainId();
  console.log(chainIds);
  //@dev verify that the user is on the correct network
  if (!(chainIds === 8001)) {
    
    /*/@dev register the network if it does not exist
    const chainId = 4;
    const chainName = "Rede de testes Rinkeby";
    const currencyName = "ETH";
    const currencySymbol = "ETH";
    const rpcUrl ="https://speedy-nodes-nyc.moralis.io/256a0fcaf30c6c2c2c8e1932/eth/rinkeby";
    const blockExplorerUrl = "https://rinkeby.etherscan.io";

    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    );*/

    //@dev switch user to correct network
    const ChangeChainId = '0x13881';
    const chainIdHex = await Moralis.switchNetwork(ChangeChainId);
  }

  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "NFT",
    })
      .then(function (user) {
        loginBtn.innerHTML = cutWalletAddress(user.get("ethAddress"));
        alanBtnInstance=animar();
        
      })
      .catch(function (error) {
        console.log(error);
      });

    return true;
  } else {
    await Moralis.User.logOut();
    alanBtnInstance.remove();
    ctx.clearRect(0,0,width,height); 
    loginBtn.innerHTML = "Login";
  }
};

/*-----------------------*/



const cutWalletAddress = (wallet)=>"Logout ("+wallet.slice(0,5)+"..."+wallet.slice(38,42)+")";
const loginBtn = document.querySelector("#login");

let user = Moralis.User.current();

if (user) {
  loginBtn.innerHTML = cutWalletAddress(user.get("ethAddress"));
  alanBtnInstance=animar();
} else {
    loginBtn.innerHTML = "Login";
    
}

//eventos
loginBtn.addEventListener("click", async () => {
  let loginApp = await login();

  if (loginApp) {
    imas();
  }else{
    nftBalance.innerHTML=`Balance Nft : 0`;
    imagen.innerHTML="";
  }
});

send.addEventListener('click', async()=>{

  const user = Moralis.User.current();
  if(user){
  
    await Moralis.enableWeb3();
    const options = {type: "erc721",  
    receiver: wallet.value,
    contractAddress: addressNft,
    tokenId: Number(Idnft.value)}

   await Moralis.transfer(options);

  }else{
    alert("logue");
  }
});
