import { ServerComms } from './ServerComms';

let sc = new ServerComms('http://localhost:8000');
console.log(test());


async function test() {
    await sc.requestUnits()
}