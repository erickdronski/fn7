/**
 * Original pixel avatars, drawn as rows of cells on a ten-by-ten grid.
 * `a` is the booth's accent, `s` its shade, `l` light, `d` dark, `.` empty.
 */
export const AVATAR_SIZE = 10;

export const AVATARS = {
  bot: [
    "....ll....",
    "....aa....",
    "..aaaaaa..",
    ".aaaaaaaa.",
    ".aldaalda.",
    ".aaaaaaaa.",
    ".aassssaa.",
    "..aaaaaa..",
    "..s....s..",
    ".ss....ss.",
  ],
  fox: [
    "a........a",
    "aa......aa",
    "aaa....aaa",
    "aaaaaaaaaa",
    "aadaaaadaa",
    "aaaaaaaaaa",
    ".aallllaa.",
    "..alllla..",
    "...lddl...",
    "....ll....",
  ],
  owl: [
    ".a......a.",
    ".aa....aa.",
    ".aaaaaaaa.",
    "alllaallla",
    "aldlaaldla",
    "alllaallla",
    "aaaallaaaa",
    ".asasasas.",
    ".sasasasa.",
    "..ll..ll..",
  ],
  crab: [
    "aa......aa",
    "a.a....a.a",
    "aa......aa",
    ".a.l..l.a.",
    ".a.d..d.a.",
    ".aaaaaaaa.",
    "aaaaaaaaaa",
    "aassssssaa",
    ".aaaaaaaa.",
    "s.s.ss.s.s",
  ],
  crane: [
    "......aa..",
    ".....adal.",
    ".....aall.",
    "......aa..",
    "......aa..",
    ".aaaaaaa..",
    "aaaaaaaa..",
    ".sssaaa...",
    "....l.l...",
    "...ll.ll..",
  ],
  moth: [
    "..l....l..",
    "...l..l...",
    "aa..aa..aa",
    "aaa.aa.aaa",
    "aslaaaalsa",
    "aaa.aa.aaa",
    ".aa.aa.aa.",
    "..s.aa.s..",
    "....aa....",
    "....ss....",
  ],
  stack: [
    "..aaaaaa..",
    ".aaaaaaaa.",
    ".saaaaaas.",
    ".ssssssss.",
    ".alaaaaaa.",
    ".saaaaaas.",
    ".ssssssss.",
    ".alaaaaaa.",
    ".saaaaaas.",
    "..ssssss..",
  ],
  lantern: [
    "....ss....",
    "...ssss...",
    "..aaaaaa..",
    "..alllla..",
    "..alllla..",
    "..alllla..",
    "..alllla..",
    "..aaaaaa..",
    "...ssss...",
    "..ss..ss..",
  ],
} as const satisfies Record<string, readonly string[]>;

export type AvatarName = keyof typeof AVATARS;

export const AVATAR_NAMES = Object.keys(AVATARS) as AvatarName[];

export const AVATAR_LABEL: Record<AvatarName, string> = {
  bot: "Courier bot",
  fox: "Tin fox",
  owl: "Chalk owl",
  crab: "Crate crab",
  crane: "Fold crane",
  moth: "Night moth",
  stack: "Ledger stack",
  lantern: "Lantern",
};

export function isAvatarName(value: string): value is AvatarName {
  return value in AVATARS;
}
