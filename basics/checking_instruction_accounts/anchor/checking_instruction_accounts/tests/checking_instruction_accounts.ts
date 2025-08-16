import * as anchor from "@coral-xyz/anchor";
import type { AnchorProgramExample } from "../target/types/anchor_program_example";
import { Keypair, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";


describe("Checking Acccounts Program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.AnchorProgramExample as anchor.Program<AnchorProgramExample>;
  const wallet = provider.wallet as anchor.Wallet;


  const accountToChange = new Keypair();
  const accountToCreate = new Keypair();


  it('Creates an account owned by our program', async() => {
    const instruction = SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey: accountToChange.publicKey,
      lamports: await provider.connection.getMinimumBalanceForRentExemption(0),
      space: 0,
      programId: program.programId,
    });

    const transaction = new Transaction().add(instruction);

    const signature = await sendAndConfirmTransaction(provider.connection, transaction, [wallet.payer, accountToChange]);

    console.log(`Signature for creating an account is ${signature}`);
  });

  it('Checks Accounts', async ()=> {
    const signature = await program.methods
    .checkAccounts()
    .accounts({
      payer: wallet.publicKey,
      accountToCreate: accountToCreate.publicKey,
      accountToChange: accountToChange.publicKey
    })
    .rpc()

    console.log(`Account has been checked successfully and here's the transaction signature ${signature}`);
  });
});