const { prisma } = require('../config/config');

async function posWaldo(req, res) {
    const { x, y } = req.body;
    const waldo = await prisma.character.findUnique({
        where: {
            name: 'Waldo'
        }
    })

    if (x >= waldo.Minx && x <= waldo.Maxx && y >= waldo.Miny && y <= waldo.Maxy) {
        res.json({ found: true });
    }
    else {
        res.json({ found: false });
    }
}

module.exports = {
    posWaldo
}