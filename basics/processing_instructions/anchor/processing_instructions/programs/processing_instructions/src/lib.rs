use anchor_lang::prelude::*;

declare_id!("AmWxcmNPwz2dv5xDR6yeYxYLJagNhMQoysfH8bWCgD2y");

#[program]
pub mod processing_instructions {
    use super::*;


    pub fn go_to_park(_ctx: Context<Park>, name: String, height: u32) -> Result<()> {
        msg!("Welcome to the Park, {}", name);

        if height > 5 {
            msg!("You are tall enough to ride this reide. Congratulations.");
        }
        else {
            msg!("You are not tall enough to ride this ride. Sorry mate.");
        };
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Park {}