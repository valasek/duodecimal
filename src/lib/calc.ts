import * as Q from './rational';


export function calc(op: '+' | '-' | '×' | '÷', a: Q.Q, b: Q.Q): Q.Q {
    switch (op) {
        case '+': return Q.add(a, b);
        case '-': return Q.sub(a, b);
        case '×': return Q.mul(a, b);
        case '÷': return Q.div(a, b);
    }
}
