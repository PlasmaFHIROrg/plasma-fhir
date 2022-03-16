import * as fs from 'fs';
import { Coding } from "fhir/r4";
import RoleCodes from '../data/RoleCodes.json';

interface Property {
  code: string,
  valueCoding?: string | object,
  valueCode?: string,
  valueBoolean?: boolean,
}

export interface RoleCode {
  code: string,
  display?: string,
  definition?: string,
  property: Property[],
}

export default function getFamilyMemberRoleCodes(): RoleCode[] {
  const adjList = buildAdjacentList();
  const familyMemberCodeStrs = dfs(adjList);
  const familyMemberCodes: RoleCode[] = []
  familyMemberCodeStrs.forEach(codeString => {
      const code = RoleCodes.find(code => code.code === codeString);
      if (code) {
          familyMemberCodes.push(code);
      }
  });
  return familyMemberCodes;
}

function buildAdjacentList() {
  const adjList: {[key: string]: string[]} = {};
  const codes: RoleCode[] = RoleCodes;
  codes.forEach(code => {  
      const toCode = code.code;
      const fromCode = code.property.find((item: any) => item['code'] === "subsumedBy")?.valueCode;
      if (!fromCode || !toCode) return;

      if (adjList[fromCode]) {
          adjList[fromCode].push(toCode);
      } else {
          adjList[fromCode] = [toCode];
      }
  });
  return adjList;
}

function dfs(adjList: {[key: string]: string[]}) {
  const visited = new Set<string>();
  const leafNodes = new Array<string>();
  dfsHelper('FAMMEMB', visited, adjList, leafNodes);
  return leafNodes;
}

function dfsHelper(current: string, visited: Set<string>, adjList: {[key: string]: string[]}, leafNodes: string[]) {
  visited.add(current);

  if (!adjList[current] || !adjList[current].length) {
      leafNodes.push(current);
  } else {
      adjList[current].forEach(child => {
          if (!visited.has(child)) {
              dfsHelper(child, visited, adjList, leafNodes);
          }
      })
  }

}

function writeCodeToFile(): void {
  const system = 'http://terminology.hl7.org/CodeSystem/v3-RoleCode';
  const stream = fs.createWriteStream('output/FamilyMemberRoleCodes.ts');
  const familymemberRoleCodes = getFamilyMemberRoleCodes();
  stream.write("// TODO: add import of Coding\n");
  stream.write("export const FamilyMemberRoleCodes = {\n");
  familymemberRoleCodes.forEach(code => {
    stream.write(`\t${code.code}: new Coding("${system}", "${code.code}","${code.display}"),\n`);
  });
  stream.write("}");
  stream.end();
}

writeCodeToFile();