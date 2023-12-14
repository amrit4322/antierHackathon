// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


import "contracts/GamingToken.sol";

contract GamingPlace{
    GamingToken gamingToken;
    enum Category{
        Adventure,
        Action,
        Sports,
        Simulation, 
        Platformer,
        RPG,
        First_person_shooter,
        Action_adventure,
        Fighting,
        Real_time_strategy,
        Racing,
        Shooter,
        Puzzle,
        Casual,
        Strategy,
        multiplayer_online_role_playing,
        Stealth, 
        Party,
        Action_RPG,
        Tactical_role_playing, 
        Survival ,
        Battle_Royale 
    }
    constructor(address _gamingToken) {
        gamingToken = GamingToken(_gamingToken);
    }
    struct  Game{
        uint id;
        string name;
        Category cat;
        uint costPrice;
        bool isAvailable;
    }

    mapping (uint =>Game) public Games;
    mapping(address=> Game[]) public GamingPlatform;
   
    function createGame(uint id,string memory name,Category cat,uint cost) public {
        require(!Games[id].isAvailable,"GP: Game is already assigned");
        Games[id] = Game(id,name,cat,cost,true);
    }

    function deleteGame(uint id) public {
        require(Games[id].isAvailable ,"GP: Game is not there");
        delete(Games[id]);
    }

    function buyToken(uint _amount) public payable {
       
        require(msg.value== _amount/100,"GP: Insufficent Funds");
        if(gamingToken.balanceOf(address(this))<_amount){
           
           gamingToken.mint(address(this), _amount);
        }
        gamingToken.transfer(msg.sender, _amount);
        

    }
    function buyGames(uint[] memory ids,uint amount) public payable{
        require(amount<=gamingToken.balanceOf(msg.sender),"GP: Insufficent Funds");
        Game[] storage hist = GamingPlatform[msg.sender];
        for(uint256 i =0;i<ids.length;i++){
            if(Games[ids[i]].isAvailable){
                hist.push(Games[ids[i]]);
            }
            
        }
        
        gamingToken.transferFrom(msg.sender,address(this), amount);
            
    }   
    function tokenBalance() public view returns(uint){
       return gamingToken.balanceOf(msg.sender);
    }
    function viewHistory() public view returns(Game[] memory){
        return GamingPlatform[msg.sender];
    }

    
   
}
    
    
   
  
