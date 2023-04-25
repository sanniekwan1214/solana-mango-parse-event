# solana-mango-parse-event

Instructions on how to run it

## prerequisites: 
setup redis first
installation steps can refer to : https://redis.io/docs/getting-started/
after install complete, open the terminal

```bash
redis-server
```
open another tab of terminal, type ping to check the connection, it should return PONG
```bash
redis-cli ping
```

check if the signature is processed, if type the following command, it will return "processed"
```bash
GET gD1k9dqRKqRCN8t3YrRPT9iwcTjBwsYnRAXpuuxk9G8Xj9FvFUo2yxNZVyRoFQAfzrpweWQLEUgu8

```

## Installation
**need to wait 20 seconds for running to avoid rate limit
```bash

1. rename .env.example to .env 
2. npm i
3. npm start
(optional)npm test
```

# Sample snippet of your parsed events data
inside ./output

Sample structure of the output
```bash
[
  {
    "signature": "3s4Cc3quezaTZMhY21WG2wH4BcQUVKvYtyChHA4wVe9jimXtYrFMhP1Ugns8rjDSmAajDsbeofZw3HU8bCdgDZE9",
    "blocktime": 1682448145,
    "event": [
      {
        "event": "PerpUpdateFunding",
        "data": [
          {
            "side": 191,
            "priceLots": 524108460,
            "maxBaseLots": 1654396507,
            "maxQuoteLots": 398968938,
            "clientOrderId": 7958880540853109000,
            "orderType": 99,
            "reduceOnly": false,
            "expiryTimestamp": 5733236203315319000,
            "limit": 63
          }
        ],
        "return": "",
        "bookData": {
          "orderId": "",
          "quantity": "",
          "price": ""
        }
      }
    ]
  },
  {
    "signature": "3hRpxk5ojpjwXtQgVxe8F9MzVxb2JaLpYFbXFcHZdbFHqKnCK5imjLk1LnqfhN194WceafZ1NcLK4LC6AcDYXYwN",
    "blocktime": 1682448145,
    "event": [
      {
        "event": "PerpUpdateFunding",
        "data": [
          {
            "side": 191,
            "priceLots": 524108460,
            "maxBaseLots": 1654396507,
            "maxQuoteLots": 398968938,
            "clientOrderId": 7958880540853109000,
            "orderType": 99,
            "reduceOnly": false,
            "expiryTimestamp": 5733236203315319000,
            "limit": 63
          }
        ],
        "return": "",
        "bookData": {
          "orderId": "",
          "quantity": "",
          "price": ""
        }
      }
    ]
  },
  {
    "signature": "3FT1ShEspur93L4mrA5fcy2LWxNymPj4TpeFk3FdPMapwZuGMysUsDWr6irBvE34SkLaaLdujuCTxK1BmkCVp2hc",
    "blocktime": 1682448145,
    "event": [
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1305380155027241674347436545",
        "bookData": {
          "orderId": "5099141230575162790419674",
          "quantity": "73",
          "price": "276424"
        }
      },
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1306131011298017955633374721",
        "bookData": {
          "orderId": "",
          "quantity": "",
          "price": ""
        }
      },
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1304464015929564963175979009",
        "bookData": {
          "orderId": "5095562562224863137406168",
          "quantity": "727",
          "price": "276230"
        }
      },
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1307047150395694666804832257",
        "bookData": {
          "orderId": "",
          "quantity": "",
          "price": ""
        }
      },
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1303680103093408602070504961",
        "bookData": {
          "orderId": "5092500402708627351837910",
          "quantity": "1453",
          "price": "276064"
        }
      },
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1307831063231851027910306305",
        "bookData": {
          "orderId": "",
          "quantity": "",
          "price": ""
        }
      },
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1302376729944136579991524353",
        "bookData": {
          "orderId": "5087409101344283515591892",
          "quantity": "8138",
          "price": "275788"
        }
      },
      {
        "event": "PerpPlaceOrder",
        "data": "",
        "return": "1309134436381123049989286913",
        "bookData": {
          "orderId": "",
          "quantity": "",
          "price": ""
        }
      }
    ]
  }
]
```

# Short description
## *what i did*
1. Setup redis for saving processed signatures to avoid duplication
2. Connect the rpc of solana and use the solana api to get the transaction message logs
3. Extract the mango event based on the IDL in mango_v4.json
4. Decode the data and return based on the definition in mango_v4.json (IDL)
5. Save to json format ./output/mangoevent{timestamp}.json
6. Setup polling

## *challenges*
1. I am new to solana api, and mango library, so it is chanllenging to me from the beginning.
2. Even google-ed about the information, it is less information that I can search
3. So eventually it is based on my understanding and try my best to understand it

## *learnings*

Problem solving: 
1. Don't panic for new challenges. Break the problems one by one and step by step first
2. Log everything to understand which part is needed
3. Write a piece of code to achieve each part first, if everything runs smooth, then can enhance the code structure and improve the logic

Solana and mango:
1. learnt to search useful logs in solana network from the log
2. learnt the rpc methods provided by solana
3. learnt based on the log return and use it understand the mango library, for example, the log returns all the instruction which can be found in mango library
4. although there is not too much information provided from the doc, based on the log provided which can break the concept step by step to understand the basic flow.

# *Short description of what you think Mango does*
General:
Mango is an open-source decentralized exchange built on the Solana blockchain. It is designed to offer fast and low-cost trading of cryptocurrencies and other digital assets.

for Mango v4:
The purpose of the Mango library is to provide developers with a set of tools and building blocks. It can use to create their own custom trading applications that are built on top of the Mango platform. 

This includes components like order books, market makers, liquidity pools, and more. By using the Mango library, developers can leverage the existing infrastructure of the Mango platform to build decentralized trading applications that are both highly performant and secure.

For example:

1. The instructions directory (src/instructions): providing the code for the on-chain instructions that can be executed on the Solana blockchain to interact with the Mango decentralized exchange. for example: add_spot_market, add_liquidity, settle_funds, cancel_order.

2. The account directory(src/accounts_ix): providing account handling including create, update, and delete Mango program accounts on the Solana blockchain.

3. The orderbook directory (/src/state/orderbook): building and managing order books, which are used to match buy and sell orders for different trading pairs in a decentralized trading application built on the Mango platform.

*MangoClient*: 
Connect with the wallet to fund your margin account so that you can place orders