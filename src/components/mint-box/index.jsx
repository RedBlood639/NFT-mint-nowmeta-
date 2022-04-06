import React, { useEffect, useState } from 'react';
import MintBoxLogo from '../../assets/images/now-meta-logo-m2-blackt.png';
import { useWeb3React } from '@web3-react/core';
import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import { injected } from '../../config/connector';
import InputNumber from '../../components/input-number';
import * as AwesomeButton from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';

import nmeta_icon from '../../assets/images/nmeta.png';
import bnb_icon from '../../assets/images/bnb.png';

import NFTArtifact from '../../abi/META.json';
import TokenArtifact from '../../abi/NMETA.json';


const MintBox = () => {
    var nftContract, tokenContract;
    const nftAddress = "0xd6A4D3a4062D2C6a5a021e72e589aa374D0140Bd";
    const tokenAddress = "0x3312F186a6Ac3460bfAA8230Ca6cDd8750B061b3";

    const [count, setCount] = useState(1);
    const [max, setMax] = useState(20);
    const [mintPrice, setMintPrice] = useState(0);
    const [mintTokenAmount, setMintTokenAmount] = useState(0);


    const { account, activate, deactivate, library } = useWeb3React();

    const mint = async () => {
        try {
            const tx = await nftContract.mint(count, {from: account, value: ethers.utils.parseUnits(String(count * mintPrice), 18)});
            await tx.wait();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `You bought ${count} NFTs successfully!`
            })
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Faild to mint NFt`
            })
        }
    }

    const tokenMint = async () => {
        try {
            var tx = await tokenContract.approve(nftAddress, ethers.utils.parseUnits(String(count), 8));
            await tx.wait();
            tx = await nftContract.tokenMint(count);
            await tx.wait();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `You bought ${count} NFTs successfully!`
            })
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Faild to mint NFt`
            })
        }
    }

    useEffect(async () => {
        const INMETA = await new ethers.ContractFactory(TokenArtifact.abi, TokenArtifact.deployedBytecode, library?.getSigner());
        tokenContract = await INMETA.attach(tokenAddress);
        console.log("TOKEN", tokenContract);

        const IMETA = await new ethers.ContractFactory(NFTArtifact.abi, NFTArtifact.deployedBytecode, library?.getSigner());
        nftContract = await IMETA.attach(nftAddress);
        console.log("NFT", nftContract);

        const _mintPrice = await nftContract.mintPrice();
        const _mintTokenAmount = await nftContract.mintPriceByToken();

        console.log(Number(_mintPrice.toBigInt()) / 10 ** 18);
        console.log(Number(_mintTokenAmount.toBigInt()) / 10 ** 8);
        
        setMintPrice(Number(_mintPrice.toBigInt()) / 10 ** 18);
        setMintTokenAmount(Number(_mintTokenAmount.toBigInt()) / 10 ** 8);
    })

    return (
        <div className='flex col center mint-box'>
            <div className='flex center mint-box-header'>
                <img className='mint-box-logo' src={MintBoxLogo} />
            </div>
            <div className='flex center '>
                <div className='mint-count'>
                    <InputNumber
                        value={count}
                        max={max}
                        onMinus={() => setCount(count > 1 ? count - 1 : 1)}
                        onPlus={() => setCount(count < max ? count + 1 : max)}
                        onMax={() => setCount(max)}
                    />
                </div>
            </div>
            <div className='flex row space-between mint-price'>
                <div className='flex'>Total:</div>
                <div className='flex'>{mintPrice * count} BNB</div>
                <div className='flex'>{mintTokenAmount * count} NMETA</div>
            </div>
            {
                account ? <div className='flex account-tag'>{account}</div> : <div></div>
            }
            <div className='flex center mint-confirm'>
                {
                    !account ? <AwesomeButton.AwesomeButton style={{ width: '100%' }} size="large" type="primary" onPress={() => activate(injected)}>Connect Wallet</AwesomeButton.AwesomeButton>
                        : <>
                            <AwesomeButton.AwesomeButton style={{ width: '50%' }} size="large" type="primary" onPress={mint}><img className='token-icon' src={bnb_icon} alt='BNB'/>MINT with BNB</AwesomeButton.AwesomeButton>
                            <AwesomeButton.AwesomeButton style={{ width: '50%' }} size="large" type="primary" onPress={tokenMint}><img className='token-icon' src={nmeta_icon} alt='NMETA'/>MINT with NMETA</AwesomeButton.AwesomeButton>
                        </>
                }
            </div>
        </div>
    )
}

export default MintBox;