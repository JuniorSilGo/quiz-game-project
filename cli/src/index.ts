/* 
comando para criar uma sala.

npx ts-node src/index.ts create-room
*/

import process = require('process');
import { createRoom } from './commands/create-room';
import { joinRoom } from './commands/join-room'

const command = process.argv[2];

switch(command) {
    case 'create-room':
        createRoom();
        break;
    case 'join-room':
        joinRoom();
        break;
    default:
        console.log('Comando inválido!');
}
