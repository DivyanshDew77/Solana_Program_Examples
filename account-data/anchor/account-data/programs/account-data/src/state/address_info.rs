use anchor_lang::prelude::*;

#[account]
#[derive(INIT_SPACE)]
pub struct AddressInfo {
    #[max_len(50)]
    pub name: String,
    pub house_number: u8,
        
}