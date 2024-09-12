const { prisma, generateToken } = require("../config/passport");
const bcrypt = require("bcryptjs");

async function register(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    res.json({ token: generateToken(newUser) });
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ token: generateToken(user) });
}

module.exports = {
    register,
    login
}