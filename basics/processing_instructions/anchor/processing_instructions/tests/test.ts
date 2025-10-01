import * as anchor from "@coral-xyz/anchor";
import type { ProcessingInstructions } from "../target/types/processing_instructions";

describe('custom-instruction-data', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ProcessingInstructions as anchor.Program<ProcessingInstructions>;
  
  it('Go to the park!', async () => {
    await program.methods.goToPark('Jimm(y',3).accounts({}).rpc();
    await program.methods.goToPark('Divyansh',21).accounts({}).rpc();
  })
})