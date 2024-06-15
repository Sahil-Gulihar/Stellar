#![no_std]
use soroban_sdk::{contract, contractimpl,contracttype,token, vec, Env, Vec,Val};
 use soroban_sdk::Address;
 use soroban_sdk::String;
 use soroban_sdk::IntoVal;
 mod events;


#[derive(Clone)]
#[contracttype]

pub enum DataPoint{
 Deadline,
 Started,
 Token,
 User(Address),
 IsClaimed,
}
pub enum FreeLancer{ //info to be retrived from ledger name:past exper.
    Wallet,
    Rating,
    // Name,
    Skills,
}

#[derive(Clone, Copy, PartialEq, Eq)]
#[repr(u32)]
pub enum State {
    InProgress = 0,
    Success = 1,
    Over = 2,
}
#[contractimpl] 
  impl  IntoVal<Env,Val> for State {
    fn into_val(&self,env:&Env) -> Val{
        (*self as u32).into_val(env)
    }
  }


  fn get_ledger_timestamp(e:Env) -> u64 {
    e.ledger().timestamp()

  }


fn get_deadline(e:&Env) -> u64 {
    e.storage().instance().get::<_,u64>(&DataPoint::Deadline)
    .expect("not set yet")
}


fn get_freelancer(e:&Env) -> Address{
    e.storage()
    .instance()
    .get::<_,Address>(&FreeLancer::Wallet)
    .expect("not set yet")
}




fn get_claimed(e:&Env) -> bool {
    e.storage().instance().get::<_,bool>(&DataPoint::IsClaimed)
    .expect("not yet")
}


fn get_token(e: &Env) -> Address {
    e.storage()
        .instance()
        .get::<_, Address>(&DataPoint::Token)
        .expect("not initialized")
}






fn get_rating(e:&Env) -> i128{
  e.storage()
  .instance()
  .get::<_,i128>(&FreeLancer::Rating)
  .expect("not set yet")
}
 

//fn get_name(e:&Env) -> &str {
  //  e.storage()
    //.instance()
    //.get::<_,&str>(&FreeLancer::Name)
  //  .expect("not set yet")
// }

fn get_skills(e:&Env) -> Vec<String>{
    e.storage()
    .instance()
    .get::<_,Vec<String>>(&FreeLancer::Name)
    .expect("not set yet")
}

fn get_user_deposited(e: &Env, user: &Address) -> i128 {
    e.storage()
        .instance()
        .get::<_, i128>(&DataPoint::User(user.clone()))
        .unwrap_or(0)
}


fn get_balance(e: &Env, contract_id: &Address) -> i128 {
    let client = token::Client::new(e, contract_id);
    client.balance(&e.current_contract_address())
}

fn set_rating(rating: u64) -> Result<u64, String> {
    if rating <= 5 {
        Ok(rating)
    } else {
        Err(String::from("Rating must be between 0 and 5."))
    }
}
fn set_user_deposited(e: &Env, user: &Address, amount: &i128) {
    e.storage()
        .instance()
        .set(&DataPoint::User(user.clone()), amount);
}

fn set_claimed(e:&Env){
    e.storage()
    .instance()
    .set(&DataPoint::IsClaimed,&true);
}

fn transfer(e:&Env,to:&Address,amount:&i128) {
    let token_contract_id = &get_token(e);
    let client = token::Client::new(e,token_contract_id);
    client.transfer(&e.current_contract_address(),to,amount);
}


#[contract]


struct Work;

#[contractimpl]
#[allow(clippy::needless_pass_by_value)]

impl Work {
    pub fn transaction(
        e:Env,
        freelancer:Address,
        deadline:u64,
        token:Address,
        rating:u64,
    )
    
    {
        assert!(
            !e.storage().instance().has(&Freelancer::Wallet),
            "already initialized"
        );
        
        e.storage().instance().set(&FreeLancer::Wallet,&freelancer);
        e.storage().instance().set(&DataPoint::IsClaimed,&false);
        e.storage().instance().set(&DataPoint::Started,&get_ledger_timestamp(&e));
        e.storage().instance().set(&DataPoint::Deadline, &deadline);
        e.storage().instance().set(&DataPoint::Token, &token);
        e.storage().instance().set(&FreeLancer::Rating,&rating);

    }

     pub fn freelancer (e:Env) -> Address {
        get_freelancer(&e)
     }

    pub fn deadline(e: Env) -> u64 {
        get_deadline(&e)
    }


    pub fn state(e: Env) -> u32 {
        get_state(&e) as u32
    }
    
    pub fn token(e: Env) -> Address {
        get_token(&e)
    }

   pub fn balance(e:Env,user:Address) -> i128{
    let free_lancer = get_freelancer(&e);
    if get_state(&e) == State::Success {
        if user != Freelancer {
            return 0;
        };

        return get_balance(&e,&get_token(&e));
    };

    get_user_deposited(&e,&user)
   }
    
    
   pub fn deposit(e: Env, user: Address, amount: i128,rate:u64){
    assert!(amount>0,"amount should be positive");
    assert!(get_state(&e)== State::InProgress,"closed");
    let token_id = get_token(&e);
    let ratings = get_rating(&e);
    let Freelancer = get_freelancer(&e);
    let balance = get_user_deposited(&e,&user);
    let client = token::Client::new(&e, &token_id);
    // get rating for client ?
    client.transfer(&user, &e.current_contract_address(), &amount);

    let contract_balance = get_balance(&e,&token_id);

    //events
     
    events::amount_changed(&e, contract_balance);

   }

   pub fn withdraw(e: Env, to: Address)  {
    let state = get_state(&e);
    let Freelancer = get_freelancer(&e);

    match state{
        State::InProgress => {
            panic!("Open")
        }

        State::Success => {

            assert!(
                to == Freelancer,
                "Gig completed,freelancer can withdraw"
            );

            assert!(
                !get_claimed(&e),
                "freelancer withdrew money"
            
            );

            let token  = get_token(&e);
            transfer(&e,&Freelancer,&get_balance(&e,&token));
            set_claimed(&e);
        }

        State::Over => {
            assert!(
                to != Freelancer,
                "gig over"
            );

            let balance = get_user_deposited(&e,&to)/get_rating(&e);
            set_user_deposited(&e,&to,&0);
            transfer(&e,&to,&balance);
            let token_id = get_token(&e);
            let contract_balance = get_balance(&e, &token_id);
            events::amount_changed(&e, contract_balance);


        }
    };
   }

    }