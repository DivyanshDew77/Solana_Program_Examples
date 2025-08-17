use anchor_lang::prelude::*;

declare_id!("9hvU1EbdvyX9J27xxjMtKDe6EnLFwQ3tEC4WYWqY9tkW");

#[program]
pub mod pda_rent_payer {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
