const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

    await prisma.character.deleteMany();
    await prisma.game.deleteMany();
    await prisma.map.deleteMany();
    await prisma.user.deleteMany();


    const map = await prisma.map.create({
        data: {
            id: 1,
            name: 'Slopes'
        },
    });
    
    await prisma.character.create({
        data: {
            name: 'Waldo',
            imageUrl: 'http://localhost:3000/images/waldo.jpg',
            Minx: 83.7,
            Maxx: 87.2,
            Miny: 70.9,
            Maxy: 77.8,
            mapId: 1
        },
    });  

    await prisma.character.create({
        data: {
            name: 'Weirdo',
            imageUrl: 'http://localhost:3000/images/waldo3.jpg',
            Minx: 89.9,
            Maxx: 92,
            Miny: 56.9,
            Maxy: 60.7,
            mapId: 1
        },
    });  

    await prisma.character.create({
        data: {
            name: 'Wena',
            imageUrl: 'http://localhost:3000/images/waldo2.jpg',
            Minx: 48.15,
            Maxx: 50.1,
            Miny: 40.6,
            Maxy: 44,
            mapId: 1
        },
    });  

    await prisma.character.create({
        data: {
            name: 'Wizard',
            imageUrl: 'http://localhost:3000/images/wizard.jpg',
            Minx: 5.9,
            Maxx: 8,
            Miny: 73.9,
            Maxy: 77.9,
            mapId: 1
        },
    }); 
    
    const user = await prisma.user.create({
        data: {
          email: 'user@example.com',
          name: 'John Doe',
          password: 'securepassword', // Password should be hashed in a real application
        },
      });
    
      // Create a game for the user and map1
      await prisma.game.create({
        data: {
          startedAt: new Date(),
          userId: user.id,
          mapId: map.id,
        },
      });

};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

