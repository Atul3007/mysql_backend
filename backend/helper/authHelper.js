import bcrypt from "bcrypt";
const saltRounds = 10;

const hashpass=async (myPlaintextPassword)=>{
    const hash=await bcrypt.hash(myPlaintextPassword, saltRounds)
    return (hash)
}

const comparePass=async (myPlaintextPassword, hash)=>{
   const compare= bcrypt.compareSync(myPlaintextPassword, hash);
   return(compare)
}

export {
    hashpass,
    comparePass
}