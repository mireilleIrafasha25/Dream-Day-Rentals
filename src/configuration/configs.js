import dotenv from 'dotenv';

dotenv.config();
const configs = {
    port: process.env.PORT || 5007,
    db: process.env.DB ||"mongodb+srv://mireilleirafasha:Mugisha12345@cluster0.4bfpmyu.mongodb.net//Weeding",
    secret: process.env.JWT_SECRET_KEY ||"LOML",
    emailService: process.env.EMAIL_SERVICE,
    emailUser: process.env.EMAIL_USER,
    emailPassword:  process.env.EMAIL_PASSWORD,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME:process.env.JWT_REFRESH_COOKIE_NAME,
}

export default configs;