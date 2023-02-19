import { di } from "@wessberg/di-compiler";
import { Program } from "typescript";

export default function(program: Program) {
  return di({ program });
}