// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts@4.9.3/token/ERC20/ERC20.sol";
contract GamingToken is ERC20 {
    constructor() ERC20("GamingToken", "GT") {}
    function mint(address account,uint amount)public  {
        _mint(account,amount);
    }

}