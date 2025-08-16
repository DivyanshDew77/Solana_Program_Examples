import * as anchor from "@coral-xyz/anchor";
import type { CloseAccountProgram } from "../target/types/close_account_program";
import { PublicKey } from "@solana/web3.js";
import { assert } from "chai";
import { Program } from "@coral-xyz/anchor";

describe("close-an-account", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CloseAccountProgram as Program<CloseAccountProgram>;
  const payer = provider.wallet as anchor.Wallet;
  console.log(`payer's public key is ${payer.publicKey}`);

  const [userAccountAddress] = PublicKey.findProgramAddressSync([Buffer.from("USER"),
    payer.publicKey.toBuffer()],
    program.programId);

    it("Create Account", async() => {
      await program.methods
      .createUser('Divyansh')
      .accounts({
        user : payer.publicKey,
        userAccount: userAccountAddress
      } as any)
      .rpc()

      const userAccount = await program.account.userState.fetch(userAccountAddress);
      assert.equal(userAccount.name, 'Divyansh');
      assert.equal(userAccount.user.toBase58(), payer.publicKey.toBase58());
    });

    it('Close Account', async () => {
      await program.methods
      .closeUser()
      .accounts({
        user: payer.publicKey,
        userAccount: userAccountAddress,
      } as any)
      .rpc();

      const userAccount = await program.account.userState.fetchNullable(userAccountAddress);
      assert.equal(userAccount, null);
    });

});