# Transmute

Open source transmute framework and platform packages.

🚧 Pardon our mess as we upgrade to support kubernetes. 🚧

🔥 DO NOT USE IN PRODUCTION 🔥

### The transmute framework is a library for connecting off-chain data with on-chain smart contracts.

This implementation is not optimized for cost, but for rapid prototyping. The framework is meant for developing proof of concepts quickly, and not currently ready for production use. 

With the framework come tutorials for managing ethereum depenencies with kubernetes. These will improve over time to support ethereum developers who want to use kubernetes locally or with cloud providers.

### Getting started

#### [Set up MiniKube](./tutorials/minikube)

```
minikube start
```

```

Before you can run the packages, we need to setup lerna:

```
npm install -g lerna
lerna bootstrap
```

Next, navigate to the `transmute-compliance-demo` directory.

```
cd packages/transmute-compliance-demo
```

Follow the instructions in the [Compliance Demo Read Me](./packages/transmute-compliance-demo)

<!-- 
- [Setup MiniKube](https://github.com/transmute-industries/transmute/tree/master/tutorials/minikube)
- [Setup IPFS](https://github.com/transmute-industries/transmute/tree/master/tutorials/minikube/ipfs)
- [Setup Ganache-CLI](https://github.com/transmute-industries/transmute/tree/master/tutorials/minikube/ganache-cli)
-->