import React, { useEffect, useState } from 'react'
import MyWeb3 from 'web3'

export default () => {
	const [account, setAccount] = useState(null)

	useEffect(() => {
		if (account) {
			// sendAsync()
			createDelegateBySigMessage2()
		}
	}, [account])

	const setAndReturnAccount = async () => {
		let account
		account = (await window.web3.eth.getAccounts())[0]
		window.web3.eth.defaultAccount = account
		window.ethereum.on('accountsChanged', () => {
			window.location.reload()
			window.scrollTo(0, 0)
		})
		return account
	}

	const createDelegateBySigMessage = async () => {
		
		const testEPI712 = '0xEb168b21e6C8590aaBbe77ff155F70a882257bA6'

		const types = {
			EIP712Domain: [
				{ name: 'name', type: 'string' },
				{ name: 'chainId', type: 'uint256' },
				{ name: 'verifyingContract', type: 'address' },
			],
			TestCollection: [
				{ name: 'id', type: 'uint256' },
				{ name: 'erc721', type: 'address' },
			],
		}

		const primaryType = 'TestCollection'
		const domain = { name: 'YallaSwap', chainId: await window.web3.eth.net.getId(), verifyingContract: testEPI712 }
		const message = { id: 1, erc721: '0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac' }
		const json = JSON.stringify({ types, primaryType, domain, message })

		window.web3.currentProvider.sendAsync(
			{
				method: 'eth_signTypedData_v4',
				params: [account, json],
				from: account,
			},
			(err, result) => {
				console.log('result', result)
				if (err) {
					return console.error(err)
				}
				const signature = result.result.substring(2)
				const r = '0x' + signature.substring(0, 64);
				const s = '0x' + signature.substring(64, 128);
				const v = '0x' + signature.substring(128, 130);
		
				console.log('v', v);
				console.log('r', r);
				console.log('s', s);
				console.log('signature', signature);
				console.log(JSON.stringify([v,r,s]))
				// The signature is now comprised of r, s, and v.
			}
		)
	}

	const createDelegateBySigMessage2 = async() => {
		
		const testEPI712 = '0x7a5266562EA581965b5a19421401Ed7dCcf2395f'
	
		const types = {
			EIP712Domain: [
				{ name: 'name', type: 'string' },
				{ name: 'chainId', type: 'uint256' },
				{ name: 'verifyingContract', type: 'address' },
				{ name: 'salt', type: 'bytes32' },
			],
			Collection: [
				{ name: 'id', type: 'uint256' },
				{ name: 'erc721', type: 'address' },
				{ name: 'name', type: 'string' },
				{ name: 'description', type: 'string' },
				{ name: 'url', type: 'string' },
				{ name: 'fee', type: 'uint256' },
				{ name: 'owner', type: 'address' },
			],
		}
		const primaryType = 'Collection'
		const domain = { 
			name: 'YallaSwap',
			chainId: await window.web3.eth.net.getId(),
			verifyingContract: testEPI712,
			salt: '0xb926e2f09f9a1a177f65ab4bffb5df165a870492312f5fcac27dbbeddfcf7c95',
		}
		const message = { 
			id: 1,
			erc721: '0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac',
			name: 'My collection',
			description: 'This is my description',
			url: 'https://test.com',
			fee: 10,
			owner: '0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac',
		}
		const json = JSON.stringify({ types, primaryType, domain, message })

		window.web3.currentProvider.sendAsync(
			{
				method: 'eth_signTypedData_v4',
				params: [account, json],
				from: account,
			},
			(err, result) => {
				console.log('result', result)
				if (err) {
					return console.error(err)
				}
				const signature = result.result.substring(2)
				const r = '0x' + signature.substring(0, 64);
				const s = '0x' + signature.substring(64, 128);
				const v = '0x' + signature.substring(128, 130);
		
				console.log('v', v);
				console.log('r', r);
				console.log('s', s);
				console.log('signature', signature);
				console.log(JSON.stringify([v,r,s]))
				// The signature is now comprised of r, s, and v.
			}
		)
	}
	
	const sendAsync = async () => {
		console.log('chain id', await web3.eth.net.getId())
		const deployedERC721 = '0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac'
		const deployedMarketplace = '0x7CA756ec284893782f437e3191F16DdaB3019529'
		const owner = '0x9E3DCDA31e2A45f93B3246417902B829850A1E41'

		const msgParams = JSON.stringify({
			types: {
				EIP712Domain: [
					{ name: 'name', type: 'string' },
					{ name: 'version', type: 'string' },
					{ name: 'chainId', type: 'uint256' },
					{ name: 'verifyingContract', type: 'address' },
					{ name: 'salt', type: 'bytes32' },
				],
				Collection: [{ name: 'id', type: 'uint256' }],
			},
			primaryType: 'Collection',
			domain: {
				name: 'YallaSwap',
				version: '1',
				chainId: await window.web3.eth.net.getId(),
				verifyingContract: deployedMarketplace,
				salt: '0xb926e2f09f9a1a177f65ab4bffb5df165a870492312f5fcac27dbbeddfcf7c95',
			},
			message: {
				id: 1,
			},
		})

		window.web3.currentProvider.sendAsync(
			{
				method: 'eth_signTypedData_v3',
				params: [account, msgParams],
				from: account,
			},
			(err, result) => {
				console.log('result', result)
				if (err) {
					return console.error(err)
				}
				const signature = result.result.substring(2)
				const r = '0x' + signature.substring(0, 64)
				const s = '0x' + signature.substring(64, 128)

				const r2 = signature.substring(0, 64)
				const s2 = signature.substring(64, 128)
				const v = parseInt(signature.substring(128, 130), 16)

				console.log([1, owner, r, s, v])
				console.log([1, owner, r2, s2, v])
				// The signature is now comprised of r, s, and v.
			}
		)
	}

	const start = async () => {
		if (typeof window.ethereum !== 'undefined') {
			window.web3 = new MyWeb3(window.ethereum)
			ethereum.request({ method: 'eth_requestAccounts' })
			let account
			try {
				account = await setAndReturnAccount()
				setAccount(account)
			} catch (e) {
				alert('Could not get your metamask account')
			}
			console.log('Account', account)
		} else {
			alert('You must have metamask installed to use this dApp')
		}
	}

	return (
		<>
			<button onClick={() => start()}>Start</button>
		</>
	)
}
