import { ConflictException, NotFoundException } from "@nestjs/common";

export class MatchNotFoundException extends NotFoundException {
    constructor(matchId: string) {
        super(`The match (${matchId}) already exists in the DataBase.`);
    }
}