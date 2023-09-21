import { FormatUtils } from "@ijstech/components";
import { BigNumber, Wallet } from "@ijstech/eth-wallet";

export const formatNumber = (value: number | string | BigNumber, decimals?: number) => {
  // let val = value;
  // const minValue = '0.0000001';
  // if (typeof value === 'string') {
  //   val = new BigNumber(value).toNumber();
  // } else if (typeof value === 'object') {
  //   val = value.toNumber();
  // }
  // if (val != 0 && new BigNumber(val).lt(minValue)) {
  //   return `<${minValue}`;
  // }
  const minValue = '0.0000001';
  const newValue = typeof value === 'object' ? value.toString() : value;
  return FormatUtils.formatNumber(newValue, { decimalFigures: decimals || 4, minValue });
};

// export const formatNumberWithSeparators = (value: number, precision?: number) => {
//   if (!value) value = 0;
//   if (precision) {
//     let outputStr = '';
//     if (value >= 1) {
//       outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
//     }
//     else {
//       outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
//     }

//     if (outputStr.length > 18) {
//       outputStr = outputStr.substr(0, 18) + '...'
//     }
//     return outputStr;
//   }
//   else {
//     return value.toLocaleString('en-US');
//   }
// }

export const getNetworkInfo = (chainId: number): any => {
  return Wallet.getClientInstance().getNetworkInfo(chainId) as any
}

export const viewOnExplorerByAddress = (chainId: number, address: string) => {
  let network = getNetworkInfo(chainId);
  if (network && network.blockExplorerUrls[0]) {
    const url = `${network.blockExplorerUrls[0]}${address}`;
    window.open(url);
  }
}

const state = {
  rpcWalletId: "",
}

export const setRpcWalletId = (value: string) => {
  state.rpcWalletId = value;
}

export const getRpcWallet = () => {
  return Wallet.getRpcWalletInstance(state.rpcWalletId);
}

export function getChainId() {
  const rpcWallet = getRpcWallet();
  return rpcWallet?.chainId;
};
