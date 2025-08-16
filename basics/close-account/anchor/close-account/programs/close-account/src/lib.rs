use anchor_lang::prelude::*;
mod instructions;
mod state;
use instructions::*;

declare_id!("BB4RaQG9jdJDFVioXGdAWtPU7oodk13Hn7TAKkVCRiAR");

#[program]
pub mod close_account_program {
    use crate::instructions::{close_user::{self, CloseUserContext}, create_user::{self, CreateUserContext}};

    use super::*;

    pub fn create_user(ctx: Context<CreateUserContext>, name: String) -> Result<()> {
        create_user::create_user(ctx, name)
    }

    pub fn close_user(ctx: Context<CloseUserContext>) -> Result<()> {
        close_user::close_user(ctx)
    }
}