# APDFInvoiceTrackerDapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Truffle set up.
0. Make sure you run these two commands: (https://github.com/trufflesuite/truffle/issues/2070) otherwise you will get failures for test in truffle console.
    npm un -g truffle
    npm i -g truffle@nodeLTS

    The version should look like:
      /Users/username>truffle version
      Truffle v5.1.17 (core: 5.1.17)
      Solidity v0.5.16 (solc-js)
      Node v10.20.1
      Web3.js v1.2.1

1. Run truffle init in the home directory.  This will create the truffle-config.js file and the contracts/ and 
migrations/ directories and their contents.  This is too set up local truffle testing for the solidity contract.
2. Edit the truffle-config.js file and make sure these entries are uncommented:
    development: {
        host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
    }

      compilers: {
    solc: {
      version: "0.6.6",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
3. Open a terminal window and run "truffle development" to get access to the truffle console.    
4. run "npm install truffle-assertions" for the truffleAssert calls in testing.

## Generate documentation
1. run "solc --userdoc --devdoc contracts/InvoiceTracker.sol" as an example.

======= contracts/InvoiceTracker.sol:InvoiceTracker =======
Developer Documentation
{
  "author": "Denis M. Putnam",
  "details": "Use at your own risk.",
  "methods":
  {
    "changeOwner(address)":
    {
      "author": "Denis M. Putnam",
      "details": "No other details.",
      "params":
      {
        "newOwner": "new address payable owner."
      }
    },
    "getCurrentOwner()":
    {
      "author": "Denis M. Putnam",
      "details": "No other details.",
      "returns":
      {
        "_0": "address current owner."
      }
    }
  },
  "title": "Invoice Tracking contract"
}
User Documentation
{
  "methods":
  {
    "changeOwner(address)":
    {
      "notice": "Change the current owner to the new owner."
    },
    "getCurrentOwner()":
    {
      "notice": "Get the current owner."
    }
  },
  "notice": "This contract tracks invoices for payment"
}

======= contracts/Owned.sol:Owned =======
Developer Documentation
{
  "author": "Denis M. Putnam",
  "details": "Use at your own risk.",
  "methods":
  {
    "changeOwner(address)":
    {
      "author": "Denis M. Putnam",
      "details": "No other details.",
      "params":
      {
        "newOwner": "new address payable owner."
      }
    },
    "constructor":
    {
      "author": "Denis M. Putnam",
      "details": "Sets the initial owner of the the contract."
    },
    "getCurrentOwner()":
    {
      "author": "Denis M. Putnam",
      "details": "No other details.",
      "returns":
      {
        "_0": "address current owner."
      }
    }
  },
  "title": "Owned contract"
}
User Documentation
{
  "methods":
  {
    "changeOwner(address)":
    {
      "notice": "Change the current owner to the new owner."
    },
    "constructor": "Constructor called when the contract is deployed.",
    "getCurrentOwner()":
    {
      "notice": "Get the current owner."
    }
  },
  "notice": "This contract establishes the owner and allows for an owner change."
}

## Solidity coverage
1. Make sure you run "npm install --save-dev solidity-coverage"

