import { ServerComms } from './ServerComms';

let sc = new ServerComms('http://localhost:8000');

async function test() {
    let data = await sc.requestUnits();
    console.log(data);
}
test()