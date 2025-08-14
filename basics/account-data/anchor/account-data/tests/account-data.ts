import * as anchor from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import type { AccountData } from '../target/types/account_data';
import { inspect } from "util";

describe('Account Data!', () => {
    const provider = anchor.AnchorProvider.env();
    console.log(`provider is ${inspect(provider)}`);
    anchor.setProvider(provider);
    const payer = provider.wallet as anchor.Wallet;
    console.log(`payer is ${inspect(payer)}`);
    const program = anchor.workspace.AccountData as anchor.Program<AccountData>;
    console.log(`program is ${inspect(program)}`)

    const addressInfoAccount = new Keypair();

    it('Create the address info account', async() => {
        console.log(`Payer Address : ${payer.publicKey}`);
        console.log(`Address info account : ${addressInfoAccount.publicKey}`);

        const addressInfo = {
            name : "Divyansh hoon",
            houseNumber : 136,
            street : "Rajiv Bhawan",
            city : "Raipur"
        };

        const signature = await program.methods
        .createAddressInfo(addressInfo.name, addressInfo.houseNumber, addressInfo.street, addressInfo.city)
        .accounts({
            addressInfo: addressInfoAccount.publicKey,
            payer : payer.publicKey,
        })
        .signers([addressInfoAccount])
        .rpc();

        console.log(`The signature is  ${signature}`);
    });


    it("Read the new account's data", async () => {
        const addressInfo = await program.account.addressInfo.fetch(addressInfoAccount.publicKey);
        console.log(`Name is ${addressInfo.name}`);
        console.log(`houseNumber is ${addressInfo.houseNumber}`);
        console.log(`Street is ${addressInfo.street}`);
        console.log(`City is ${addressInfo.city}`);
    })
});