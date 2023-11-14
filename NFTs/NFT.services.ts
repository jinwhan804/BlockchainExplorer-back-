import NFTDTO from "./NFT.dtos";
import db from "../database";

const createNFT = async (data : NFTDTO) => {
    try {
        const { token_id, name, description, image_url, creator_address, status } = data;

        await db.models.NFT.create({
            token_id,
            name,
            description,
            image_url,
            creator_address,
            status
        })
    } catch (error) {
        console.log('NFT 서비스에서 NFT 데이터 추가하다 에러남');
        console.log(error);
    }
}

export default { createNFT };