import assert from 'assert';
import {Given, When, Then} from '@cucumber/cucumber';

function isItFriday(today: string) {
    return today==='Friday' ? 'TGIF':'Nope';
}

Given('today is Sunday', function () {
    this.today = 'Sunday';
});

Given('today is Friday', function () {
    this.today = 'Friday';
});

Given('today is Saturday', function () {
    this.today = 'Saturday';
});

When('I ask whether it\'s Friday yet', function () {
    this.actualAnswer = isItFriday(this.today)
});

Then('I should be told {string}', function (expectedAnswer) {
    assert.strictEqual(this.actualAnswer, expectedAnswer)
});

