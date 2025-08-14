import { describe, it } from "node:test";
import * as anchor from '@coral-xyz/anchor';
import type { AccountData } from "../target/types/account_data";
import { Keypair, PublicKey } from '@solana/web3.js';
import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";

const IDL = require("../target/idl/anchor_program_example.json");

const PROGRAM_ID = new PublicKey('JAtNXRnwsThyGmgwdWg9nEDE5LAcjMZPsnDzDFDYaqtS');

describe('Account Data!', async () => {
    const context = await startAnchor('', [{name: 'account_data', programId: PROGRAM_ID}], []);
    const provider = new BankrunProvider(context);

    const payer = provider.wallet as anchor.Wallet;
    const program = new anchor.Program<AccountData>(IDL,provider);

    const addressInfoAccount = new Keypair();

    it('Create the address info account', async () => {
        console.log(`Payer Address : ${payer.publicKey}`);
        console.log(`Address Info Acct: ${addressInfoAccount.publicKey}`);

        const addressInfo = {
            name: 'Joe C',
            houseNumber: 136,
            street: 'Mile High Dr.',
            city: 'Solana Beach',
        };

        await program.methods
        .createAddressInfo(addressInfo.name, addressInfo.houseNumber, addressInfo.street, addressInfo.city)
        .accounts({
            addressInfo: addressInfoAccount.publicKey,
            payer: payer.publicKey,
        })
        .signers([addressInfoAccount])
        .rpc();
    });

    it("Read the new account's data", async() => {
        const addressInfo = await program.account.addressInfo.fetch(addressInfoAccount.publicKey);
        console.log(`Name : ${addressInfo.name}`);
        console.log(`House Number : ${addressInfo.houseNumber}`);
        console.log(`Street : ${addressInfo.street}`);
        console.log(`City : ${addressInfo.city}`);
    })
    

})