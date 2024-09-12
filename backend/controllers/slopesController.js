const { prisma } = require('../config/passport');

async function posCharacter(req, res) {
    const { x, y } = req.body;
    const character = await prisma.character.findFirst({
        where: {
            Minx: { lte: x },
            Maxx: { gte: x },
            Miny: { lte: y },
            Maxy: { gte: y }
        }
    })

    if (!character) {
        return res.json({ found: false });
    };

    res.json({ found: true, character });
}

async function getCharacters(req, res) {
    const characters = await prisma.character.findMany({
        where: {
            mapId: +req.params.mapid
        }
    });
    res.json(characters);
}

async function startGame(req, res) {

    const user = req.user;
    const mapId = +req.params.mapid;

    const game = await prisma.game.create({
        data: {
            userId: user.id,
            mapId,
            startedAt: new Date()
        }
    });

    res.json({ game });

}

async function stopGame(req, res) {

    console.log(req.body.gameId);
    console.log(req.body);

    // Update the game to set the endTime
    const game = await prisma.game.update({
        where: {
            id: req.body.gameId
        },
        data: {
            endedAt: new Date()
        }
    });

    res.json({ game });
}

async function getLeaderboard(req, res) {
    try {
        const leaderboard = await prisma.$queryRaw`
            SELECT 
                g.*, 
                u.email, 
                (EXTRACT(EPOCH FROM g."endedAt") - EXTRACT(EPOCH FROM g."startedAt")) AS duration
            FROM "Game" g
            JOIN "User" u ON g."userId" = u.id
            ORDER BY duration ASC;
        `;
        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    posCharacter,
    getCharacters,
    startGame,
    stopGame,
    getLeaderboard
}