let input = require('./input');
let s = 0;
i.split('\n\n').forEach(g => s += g.split('\n').reduce((a, b) => a.filter(c => b.includes(c))).length);
i.split('\n\n').forEach(g => s += g.split('\n').map(p => p = p.split('')).reduce((a, b) => a.filter(c => b.includes(c))).length);
