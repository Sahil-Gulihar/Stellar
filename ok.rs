// DEPOSIT
// -- StateManagement - Success NOTsuccess
// LedgerTimestamp
// AMOUNT SEX SUXXXX
// GAS PRICE -> DONE
// Lancer transfer -> 
// 
// COMPLETED:
// Deadline Fetch
// SKILL Fetch
// Rating Fetch
//
//


// GPT CODE HERE!!!! WARNINGGGGGG
// ___________________________________________________
// CODE IMPLETMENTED
//fn transfer(value,reciever){
    //sendmoney()
//}


//fn realamount{
    //gasprice = 0.25 * value
    //misc = (timeuntildeadline + rating) * 0.3
    //amount = value - gasprice + 
    // amount transfer
    //transfer(value,address)
//}



struct Transaction {
    value: f64,
    receiver: String,
    gas_price: f64,
    misc: f64,
    time_until_deadline: u64,
    rating: f64,
}

impl Transaction {
    fn new(value: f64, receiver: String, time_until_deadline: u64, rating: f64) -> Self {
        Self {
            value,
            receiver,
            gas_price: 0.25 * value,
            misc: (time_until_deadline as f64 + rating) * 0.3,
            time_until_deadline,
            rating,
        }
    }

    fn calculate_real_amount(&self) -> f64 {
        self.value - self.gas_price + self.misc
    }

    
    // THIS FUNCTION FROM EXAMPLE SNIPPET
    fn transfer(e: &Env, to: &Address, amount: &i128) {
    let token_contract_id = &get_token(e);
    let client = token::Client::new(e, token_contract_id);
    client.transfer(&e.current_contract_address(), to, amount);
    }


    fn execute(&self) {
        self.transfer();
    }
}


// ___________________________________________________


// TIMESTAMP EXAMPLE FROM SNIPPET
//
//
// ___________________________________________________
//
fn get_ledger_timestamp(e: &Env) -> u64 {
    e.ledger().timestamp()
}

// ___________________________________________________












#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};


#[derive(Clone)]
#[contracttype]

pub enum DataPoint{
 Deadline,
 Token,
 User(address),
 IsClaimed,
}
pub enum FreeLancer{ //info to be retrived from ledger name:past exper.
    Wallet,
    Rating,
    Name,
    Skills,
}

#[derive(Clone, Copy, PartialEq, Eq)]
#[repr(u32)]
pub enum State {
    InProgress = 0,
    Success = 1,
    Over = 2,
}



fn get_deadline(e:&Env) -> u64 {
    e.storage().instance().get::<_,u64>(&DataPoint::Deadline)
    .expect("not set yet")
}


fn get_claimed(e:&Env) -> bool {
    e.storage().instance().get::<_,bool>(&DataPoint::IsClaimed)
    .expect("not yet")
}


fn get_token(e: &Env) -> Address {
    e.storage()
        .instance()
        .get::<_, Address>(&DataKey::Token)
        .expect("not initialized")
}



fn get_freelancer(e:&Env) -> Address{
    e.storage()
    .instance()
    .get::<_,Address>(&FreeLancer::Wallet)
    .expect("not set yet")
}


fn get_rating(e:&Env) -> u64{
  e.storage()
  .instance()
  .get::<_,u64>(&FreeLancer::Rating)
  .expect("not set yet")
}
 

fn get_name(e:&Env) -> &String {
    e.storage()
    .instance()
    .get::<_,&String>(&FreeLancer::Name)
    .expect("not set yet")
}

fn get_skills(e:&Env) -> Vec<String>{
    e.storage()
    .instance()
    .get::<_,Vec<String>>(&FreeLancer::Name)
    .expect("not set yet")
}

fn transfer(e:&Env,to:&Address,amount:&i128) {
    let token_contract_id = &get_token(e);
    let client = token::Client::new(e,token_contract_id);
    client.transfer(&e.current_contract_address(),to,amount);
}
