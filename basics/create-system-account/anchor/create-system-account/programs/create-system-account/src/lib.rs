use anchor_lang::prelude::*;
use anchor_lang::system_program::{create_account, CreateAccount};
declare_id!("24u8TwH5HdxCdfDQyqYKm7fX3S6DJcqKvDN4VcQEKkH6");

#[program]
pub mod create_system_account {
    use super::*;

    pub fn create_system_account(ctx: Context<CreateSystemAccount>) -> Result<()> {
        msg!("Program invoked, Creating a system account...");
        msg!(
            "New Public Key will be: {}",
            &ctx.accounts.new_account.key().to_string()
        );

        let lamports = (Rent::get()?).minimum_balance(0);

        create_account(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                CreateAccount {
                    from: ctx.accounts.payer.to_account_info(),
                    to: ctx.accounts.new_account.to_account_info(),
                },
            ),
            lamports,
            0,
            &ctx.accounts.system_program.key(),
        )?;

        msg!("Account created successfully");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateSystemAccount<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut)]
    pub new_account: Signer<'info>,
    pub system_program: Program<'info, System>,
}