Feature:
  As a user
  I can login into the application

  Background:
    Given there is following user:
      | email    | test@test.fr |
      | password | secret       |

  Scenario: I can login
    When I add "Content-Type" header equal to "application/json"
    And I send a POST request to "/security/login" with body:
    """JSON
    {
      "username": "test@test.fr",
      "password": "secret"
    }
    """
    Then the response status code should be 204

