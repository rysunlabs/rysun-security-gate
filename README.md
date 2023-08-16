# @rysun/security-gate

Add a security layer to your code in production with security-gate. This package checks the console.log () in all files that end with .js, .ts, .jsx, and .tsx extensions. It will throw an error if the console.log () exists in any files and won't allow the user to make a commit through Command or any GUI. 

## Installation & Usage

To install this package, enter this command on your terminal: 
```bash
npm install @rysun/security-gate
or
yarn add @rysun/security-gate
```

To use the functionality of this node module in your project, run the following command in the terminal: 
```bash
npx security_gate
```

Or else you can download this package globally in your system using the following command: 
```bash
npm install -g @rysun/security-gate
or
yarn global add @rysun/security-gate
```

To use the functionality of this node module globally in your project, run the following command in the terminal: 
```bash
security_gate
```