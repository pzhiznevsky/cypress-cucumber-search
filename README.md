# Cypress Cucumber E2E Testing Framework

Cypress Cucumber E2E Testing Framework project represents a starting point for writing tests in Cypress with Cucumber.

Provided tests are based on examples how to define and use utility functions, explicit wait for some element and possible solutions for organizing tests using separated files with locators of the elements.

## Launch Cypress and Execute Test Cases

Open the terminal inside `<local_path>\cypress-cucumber-search` and use the following commands to:

- Open the Cypress UI to execute test cases against default environment: ```npx cypress open```
- Execute all test cases without opening the Cypress UI against default environment: ```npx cypress run```

- Environment variables:
  - `ENV`, which can have value `prod` / `local`, depending on which environment you would like to execute your tests (if not defined, `prod` will be used by default)
    - `prod` uses `https://docs.cypress.io/app/get-started/why-cypress` as app URL
    - `local` uses `http://localhost` as app URL
  - `TAGS`, which can be any of available tags set in Cucumber features. If not set all scenarios will be executed. Tag expression is an infix boolean expression, some examples:
    - `@search` - Scenarios tagged with `@search` will be filtered

Example of above commands with possible variables:

- `npx cypress open --env ENV=local` - Open Cypress UI to execute tests against Local environment
- `npx cypress run --env ENV=prod` - Execute All tests without opening the Cypress UI against Production environment
- `npx cypress run --spec "**/login.feature" --env ENV=local` - Execute Login feature without opening the Cypress UI on Local environment
- `npx cypress run --env ENV=prod,TAGS='(@search or @sanity) and (not @bug)'` - Execute tests tagged with `@search` or `@create` which are not also tagged with `@bug`, without opening the Cypress UI on Production environment

Some of predefined scripts in [`package.json`](/package.json) are doing same thing as commands above:

- `npm run cy:open:local` or `npm run cy:open:prod` - Open Cypress UI to execute tests against Local or Production environment
- `npm run cy:run:local` or `npm run cy:run:prod` - Execute All tests without opening the Cypress UI against Local or Production environment

## Gherkin standards and rules

### Describing Features

Every feature must only contain scenarios related to that it. When grouping scenarios under one feature make sure that `@Background` for that feature is common for all scenarios.
If some feature is complex and there are different `@Background` for group them in multiple feature file.

If you have problems describing feature you can use next template, known as a Feature Injection template:

    In order to <meet some goal>
    As a <type of stakeholder>
    I want <a feature>

By starting with the goal or value that the feature provides, you’re making it explicit to everyone who ever works on this feature why they’re giving up their precious time. You’re also offering people an opportunity to think about other ways that the goal could be met.

### Writing Scenarios

Using Given-When-Then in sequence is a great reminder for several great test design ideas. It suggests that pre-conditions and post-conditions need to be identified and separated. It suggests that the purpose of the test should be clearly communicated, and that each scenario should check one and only one thing. When there is only one action under test, people are forced to look beyond the mechanics of test execution and really identify a clear purpose.

When used correctly, Given-When-Then helps teams design specifications and checks that are easy to understand and maintain. As tests will be focused on one particular action, they will be less brittle and easier to diagnose and troubleshoot. When the parameters and expectations are clearly separated, it’s easier to evaluate if we need to add more examples, and discover missing cases.

#### General Rules

To prevents most of accidental misuse of Given-When-Then use:

- Write **_Given_** in Past tense as Passive sentences - these statements are describing preconditions and parameters (values rather than actions)
- Write **_When_** in Present tense as Active sentences - these statements are describing action under test
- Write **_Then_** in Future tense as Passive sentences - these statements are describing post-conditions and expectations (values rather than actions)

Make sure that there is only **one** **_When_** statement for each scenario.

Also make sure that there are no **and** conjunctions in sentences. If there is, it must be split into separate step.

### Matching Step Definition with Cucumber Expressions

- To match Gherkin Scenario Step text **_Cucumber Expression_** are used
- When writing **_Cucumber Expressions_** matchers always make sure that at least similar words and plurals are covered and will be matched by using:
  - [Optional text](https://github.com/cucumber/cucumber-expressions#optional-text)
  - [Alternative text](https://github.com/cucumber/cucumber-expressions#alternative-text)
  - [Escaping](https://github.com/cucumber/cucumber-expressions#escaping)
