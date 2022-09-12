Feature:
  In order to contact the website creator
  As a visitor
  I need to be able to send an email

  Scenario: I can send an email to the website creator
    When I add "Content-Type" header equal to "application/json"
    And I send a POST request to "/public/contact-me" with body:
    """JSON
    {
      "email": "test@test.fr",
      "name": "Jean",
      "subject": "Hello",
      "message": "Hello how are you ?"
    }
    """
    Then the response status code should be 202
    And 1 email should have been sent
    And the 1st email sent should be from "contact@pierre-bourdet.dev" to "personal@test.fr" with subject "Hello"
    And the 1st email sent body should contain "Hello how are you ?"

  Scenario: I get an error if I send invalid data
    When I add "Content-Type" header equal to "application/json"
    And I send a POST request to "/public/contact-me" with body:
    """JSON
    {
      "email": "not email",
      "name": "",
      "subject": "Hello",
      "message": "Hello how are you ?"
    }
    """
    Then the response should be in JSON
    And the response status code should be 400
    And 0 email should have been sent
    And the JSON node "violations[0].propertyPath" should be equal to "email"
    And the JSON node "violations[1].propertyPath" should be equal to "name"
