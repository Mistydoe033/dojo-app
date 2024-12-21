use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Account {
    #[key]
    wallet: ContractAddress,
    #[key]
    username: felt252,
    player_age: u64,
    
}