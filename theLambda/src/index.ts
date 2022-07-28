import { sayHello } from 'theLayer';

export async function handler() {
    return { 'message': sayHello() }
}