use starknet::{ContractAddress};
use dojo_misty_app::models::{Account};

// define the interface
#[starknet::interface]
trait IActions<T> {

    fn new_account(ref self: T, wallet: ContractAddress, username: felt252, player_age: u64);
    fn get_account_for_wallet(ref self: T, wallet:ContractAddress,username: felt252) -> Account;
}

// dojo decorator
#[dojo::contract]
pub mod actions {
    use super::{IActions};
    use starknet::{ContractAddress, get_caller_address};
    use dojo_misty_app::models::{Account};

    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::event::EventStorage;
    


    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {

        fn new_account(ref self: ContractState, wallet: ContractAddress, username: felt252, player_age: u64) {
            let mut world = self.world_default();
            let new_account = Account {
                wallet,
                username,
                player_age,
            };
            world.write_model(@new_account); // Write a new account record
        }

        fn get_account_for_wallet(ref self: ContractState, wallet: ContractAddress, username: felt252) -> Account {
            let world = self.world_default();

            // Read all account for the given wallet from the Dojo world storage.
            let account: Account = world.read_model((wallet, username));
            
            account
        }
       
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        /// Use the default namespace "dojo_misty_app". This function is handy since the ByteArray
        /// can't be const.
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_misty_app")
        }
    }
}

