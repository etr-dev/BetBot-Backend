import { PartialType } from "@nestjs/mapped-types";
import { MatchDto } from "../match.dto";

export class GetMatchDto extends PartialType(MatchDto) {};