use anchor_lang::prelude::*;

declare_id!("ECPNcVp1HfG9x8HagrLX9yWVvDTBVdXb14jSVXURXuii");

#[program]
pub mod anchor_program_example {
    use super::*;

    pub fn check_accounts(_context: Context<CheckingAccounts>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CheckingAccounts<'info> {
    payer : Signer<'info>,

    /// CHECK: commenting to get rid of safety checks error
    #[account(mut)]
    account_to_create: UncheckedAccount<'info>,
    #[account(
        mut,
        owner = id()
    )]
    /// CHECK: again
    account_to_change: UncheckedAccount<'info>, //again
    system_program: Program<'info, System>
}