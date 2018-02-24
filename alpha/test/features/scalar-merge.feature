#noinspection CucumberUndefinedStep
Feature: Merge scalar data in a Map
  Scenario: Add "value:1" to an empty Map
    Given "m" is an empty Map
    When I call the set function "m.set('value', 1)"
    Then m deep-equals { "value": 1 }
