## NVM version
$ nvm use

## Sandbox/Documentation

To setup the sandbox project we need to link the local project with the sandbox project. 
Start in the project root folder, then.

```bash
cd raccoon
npm link
cd ../sandbox
npm link raccoon
npm start
```

List linked packages
```
Global modules: npm ls --link --global
Local modules: npm ls --link (lists links for current local folder)
```

Unlink package
```
npm unlink raccoon-js-framework --global
```

## Publish NPM package

`npm login`

`npm publish --dry-run` - Ensure we don't publish unnecessary date, only publish readme, sourcefile and license.

`npm publish`

`npm whoami` - Check who you're logged in as.

`npm access ls-packages` - Ensure that you have the necessary permissions to publish packages

**Private vs public**
In your terminal, run npm publish --access=public to actually publish the package to npm. Note: --access=public is needed for scoped packages (@clarkio/modern-npm-package) as they're private by default. If it's not scoped and doesn't have the private field set to true in your package.json, it will be public as well.

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
```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});
```

## Advanced testing
If useing the CLI we have a few more options.
- jest --watch
- key press p - stops and lists some options
- Now we can run specific test or just run the failed ones. 

Alternatively
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


## Jest setup 

Add jest config file
```js
// jset.config.js
setupFilesAfterEnv: ['./jest.setup.js'],
```

Set default wait time
```js
// jset.setup.js
jest.setTimeout(6000) // 6s
```
## General good to know

**Trigger input events**
Run `dispatchEvent(new Event([event name]))` after setting an event to trigger the event
e.g `mousemove` `keyup` `submit` etc.
```js
inputEl.value = 2
inputEl.dispatchEvent(new Event('change'));
```

**innerText vs textContent**

Both are returning all text including children but innerText also returns some dom elements.

```js
element.textContent
// -> 'This is some text'

element.innerHTML
// -> '<strong>This<strong> is some text'
```

**Issues with innerText**
There has been an issue with jest not updating after when using `innerText` in scripts. 
Replacing this with `innerHTML` or `textContent` solved this issue.

Following could be the reason. 
[stackoverflow](https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext). 
[Similar issue](https://salesforce.stackexchange.com/questions/375070/jest-dom-is-not-updating-after-element-innertext-is-set-imperatively)

1. innerText was non-standard, textContent was standardized earlier.
2. innerText is much more performance-heavy: it requires layout information to return the result.
3. innerText is defined only for HTMLElement objects, while textContent is defined for all Node objects


## Summary of libraries and modules

**Table of content**

- testing-library
- jest-dom
- @testing-library/dom
- @testing-library/jest-dom

**jest-dom** provides a variety of custom matchers that you can use to make assertions about the state of the DOM in your tests. Here is a list of some of the matchers that are provided by jest-dom:

**Note** these are simmilar or the same functions as in **@testing-library/jest-dom**

- **toBeDisabled**: makes an assertion about whether a DOM element is disabled
- **toBeEnabled**: makes an assertion about whether a DOM element is enabled
- **toBeEmpty**: makes an assertion about whether a DOM element is empty (i.e., has no children)
- **toBeInTheDocument**: makes an assertion about whether a DOM element is part of the document
- **toBeInvalid**: makes an assertion about whether a DOM element is invalid
- **toBeRequired**: makes an assertion about whether a DOM element is required
- **toBeValid**: makes an assertion about whether a DOM element is valid
- **toContainElement**: makes an assertion about whether a DOM element contains another DOM element as a descendant
- **toContainHTML**: makes an assertion about whether a DOM element contains a specific string of HTML
- **toHaveAttribute**: makes an assertion about whether a DOM element has a specific attribute
- **toHaveClass**: makes an assertion about whether a DOM element has a specific class
- **toHaveFocus**: makes an assertion about whether a DOM element has focus
- **toHaveFormValues**: makes an assertion about the values of form elements within a DOM element
- **toHaveStyle**: makes an assertion about the style of a DOM element
- **toHaveTextContent**: makes an assertion about the text content of a DOM element
- **toHaveValue**: makes an assertion about the value of a DOM element

**testing-library** is a collection of libraries for writing and running tests for your code

**@testing-library/dom vs @testing-library/jest-dom**
@testing-library/dom provides utility functions for interacting with and testing the DOM, while @testing-library/jest-dom provides Jest matchers for making assertions about the DOM.

**@testing-library/dom**

`npm i @testing-library/dom  --save-dev`

`import { waitFor } from '@testing-library/dom';`

- **getBy***
- **findBy***
- **queryBy***
- **getAllBy***
- **waitFor***: Functions for waiting for elements to appear or for their attributes or content to change
- **waitForElementToBeRemoved**
- **waitForElementToBeRemovedBy***
- **fireEvent**: Function for firing DOM events on elements
- **cleanup**: Function for cleaning up after tests (removing elements from the DOM, restoring mocked functions, etc.)

**@testing-library/jest-dom**

`npm install @testing-library/jest-dom --save-dev`

`import '@testing-library/jest-dom';`

https://testing-library.com/docs/ecosystem-jest-dom/

- **toBeDisabled**: Checks whether an element is disabled
- **toBeEnabled**: Checks whether an element is enabled
- **toBeEmpty**: Checks whether an element is empty (i.e., it has no children)
- **toBeInTheDocument**: Checks whether an element is present in the document
- **toBeInvalid**: Checks whether an element is invalid (i.e., it has a validity.valid property of false)
- **toBeRequired**: Checks whether an element is required
- **toBeValid**: Checks whether an element is valid (i.e., it has a validity.valid property of true)
- **toContainElement**: Checks whether an element contains another element as a descendant
- **toContainHTML**: Checks whether an element contains a specific string of HTML
- **toHaveAttribute**: Checks whether an element has a specific attribute
- **toHaveClass**: Checks whether an element has a specific class
- **toHaveFocus**: Checks whether an element has focus
- **toHaveFormValues**: Checks whether an element has specific form values
- **toHaveStyle**: Checks whether an element has a specific style
- **toHaveTextContent**: Checks whether an element has a specific text content
- **toHaveValue**: Checks whether an element has a specific value

