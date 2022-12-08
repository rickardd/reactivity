ToDo

- Separate index.js and reactive.js
- Better folder structure
- Set up so the server can run in sandbox but having the source code outside. 
- Add testing - Jest
- Add if attributes
- Add loop attributes
- Allow multiple components in one view
- Create example: Use eternal API and parse the data. 
- Create a quiz


## NVM version
$ nvm use

## Test
$ npm run test

## Test with Debugging in vsCode
cd into the sandbox folder
nvm use
in vscode run 'Debug: JavaScript Debug Terminal'
`npm run test --watch`
or
`npm run test:watch`



This should stop on 'debugger' breakpoints in vs code and inspecting values with the mouse is possible. 

Another alternative might be to let the test finish then hit `w` and then `i` (run failing test interactively)

**Run a specific test** 
`npm run test:pattern "the name or regex of a test"`
or
`npm run test:watch:pattern "the name or regex of a test"`

**or* add `.only`
```
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});
```

## Advanced testing
If useing the CLI we have a few more options.
- jest --watch
- key press p - stops and lists some options
- Now we can run specific test or just run the failed ones. 

Alternativliy
Let the test finish then hit `w`

 - Press a to run all tests.
 - Press f to run only failed tests.
 - Press o to only run tests related to changed files.
 - Press p to filter by a filename regex pattern.
 - Press t to filter by a test name regex pattern.
 - Press q to quit watch mode.
 - Press i to run failing tests interactively.
 - Press Enter to trigger a test run.

## Test coverage graph

- Function coverage Has each function (or subroutine) in the program been called?
- Statement coverage Has each statement in the program been executed?
- Branch coverage Has each branch (also called DD-path) of each control structure (such as in if and case statements) been executed? For example, given an if statement, have both the true and false branches been executed? Another way of saying this is, has every edge in the program been executed?
- Line coverage has each executable line in the source file been executed?called?
- Statement coverage Has each statement in the program been executed?
- Branch coverage Has each branch (also called DD-path) of each control structure (such as in if and case statements) been executed? For example, given an if statement, have both the true and false branches been executed? Another way of saying this is, has every edge in the program been executed?
- Line coverage has each executable line in the source file been executed?
