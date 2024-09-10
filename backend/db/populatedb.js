const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

prisma.map.create({
    data: {
        id: 1,
        name: 'Slopes'
    },
});

prisma.character.create({
    data: {
        name: 'Waldo',
        Minx: 83.7,
        Maxx: 87.2,
        Miny: 70.9,
        Maxy: 77.8,
        map: {
            connect: { id: 1 }
        }
    },
});
