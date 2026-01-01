import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CreateSystemAccount } from "../target/types/create_system_account";
import { Keypair } from "@solana/web3.js";
import { assert } from "chai";

describe("Anchor: Create a system account", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet as anchor.Wallet;
  const connection = provider.connection;
  const program = anchor.workspace
        .CreateSystemAccount as anchor.Program<CreateSystemAccount>;
      
    it("Create the account", async() =>{
      const newKeypair = new Keypair();
      
      await program.methods
      .createSystemAccount()
      .accounts({
        payer: wallet.publicKey,
        newAccount: newKeypair.publicKey,
      })
      .signers([newKeypair])
      .rpc();

      const lamports = await connection.getMinimumBalanceForRentExemption(0);

      const accountInfo = await connection.getAccountInfo(newKeypair.publicKey);
      assert(accountInfo.lamports == lamports);
    });
});