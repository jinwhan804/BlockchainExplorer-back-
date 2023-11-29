import db from "../database";

const createTokenEoa = async (
  tokenId: number,
  eoaId: number,
  amount: number,
  name: string,
  symbol: string
) => {
  try {
    console.log("createTokenEoa", tokenId, eoaId, amount, name, symbol);
    await db.models.TokenEOA.create({
      eoaid: eoaId,
      tokenid: tokenId,
      amount: amount,
      name: name,
      symbol: symbol,
    });
  } catch (error) {
    console.log("createTokenEoa", error);
  }
};

export default { createTokenEoa };
