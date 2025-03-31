@search
Feature: Main Page Search Functionality

  Background: Background name
    Given Visitor is on the Main Page

  @sanity
  Scenario Outline: Perform a search on the main page
    Given I wait for the main page to load
    When I search for '<query>'
    Then I should see search results for '<query>'
    Examples:
      | query   |
      | Cypress |
      | Cucumber|

  @bug @issue-BUG-1234 @critical
  Scenario Outline: Perform a search on the main page marked as bug
    Given I wait for the main page to load
    When I search for '<query>'
    Then I should see search results for '<query>'
    Examples:
      | query     |
      | !@#$%^&*|
