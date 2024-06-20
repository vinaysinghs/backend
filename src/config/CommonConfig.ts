
export const CommonConfig = {
    PORT: process.env.PORT || 5000,


    // DB CONFIG
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/msocial',

    API_URL: process.env.API_URL || 'api/',
    API_ADMIN_URL: process.env.API_ADMIN_URL || 'api/admin/',

    BCRYPTSALT:10,

    CRYPTO_SECRET_KEY:'$#%^TYGHGY^%%^RTYG&^YHHY&*HYGT%^DREDESW#@$W#%DFTV^AS#%$$%'
};