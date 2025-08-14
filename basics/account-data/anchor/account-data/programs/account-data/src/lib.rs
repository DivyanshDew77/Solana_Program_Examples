use anchor_lang::prelude::*;
use instructions::*;

pub mod constants;
pub mod instructions;
pub mod state;

declare_id!("JAtNXRnwsThyGmgwdWg9nEDE5LAcjMZPsnDzDFDYaqtS");

#[program]
pub mod account_data {
    use super::*;

    pub fn create_address_info(
        ctx: Context<CreateAddressInfo>,
        name: String,
        house_number: u8,
        street: String,
        city: String
    ) -> Result<()>{
        create::create_address_info(ctx, name, house_number, street, city)
    }
}