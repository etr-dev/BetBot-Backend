import { PartialType } from "@nestjs/mapped-types";
import { User } from "@schemas";

export class GetUserDto extends PartialType(User) { }