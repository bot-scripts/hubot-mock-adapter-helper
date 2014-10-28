# hubot-mock-adapter-helper

A helper for [hubot-mock-adapter](https://github.com/blalor/hubot-mock-adapter).

## Installation

Install with [npm](https://www.npmjs.org/):

    $ npm install hubot-mock-adapter-helper --save-dev

## Example

You can write the test code in this way.

```coffeescript
expect = require('chai').expect
helper = require 'hubot-mock-adapter-helper'

TextMessage = require('hubot/src/message').TextMessage

describe 'ping', ->
  {robot, user, adapter} = {}

  beforeEach (done) ->
    helper.setupRobot (ret) ->
      {robot, user, adapter} = ret
      done()

  afterEach ->
    robot.shutdown()

  it 'responds "PONG"', (done) ->
    adapter.on 'reply', (envelope, strings) ->
      expect(envelope.user.name).to.equal('mocha')
      expect(strings[0]).to.equal('PONG')
    , done

    adapter.receive(new TextMessage(user, 'hubot ping'))
```
